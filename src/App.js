import React, { Component } from 'react';

// firebase --------------------------------------------------------------------
import firebase from './firebase';

// bootstrap styles and js -----------------------------------------------------
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// React Date Picker and Moment ------------------------------------------------
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

// styles ----------------------------------------------------------------------
import './App.css';

// Components ------------------------------------------------------------------
import KeywordSearch from './Components/KeywordSearch';
import ShowCompletedCheckbox from './Components/ShowCompletedCheckbox';
import TaskEdit from './Components/TaskEdit';
import TaskList from './Components/TaskList';


// =============================================================================
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currrent_task: null,
      task_list: null,
      show_completed: true,
      keyword_search: null,
      tag_search: null,
    };

    // firebase DB reference
    this.fbTasksRef = null;

    this.onTaskNameChanged = this.onTaskNameChanged.bind(this);
    this.onTaskDescriptionChanged = this.onTaskDescriptionChanged.bind(this);
    this.onSaveCurrentTask = this.onSaveCurrentTask.bind(this);

    this.onShowCompletedToggle = this.onShowCompletedToggle.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.onAddTask = this.onAddTask.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onTaskToggle = this.onTaskToggle.bind(this);

    document.title = "TaskPro"
    // favicon set in index.html
  }

  componentDidMount() {

    this.fbTasksRef = firebase.database().ref('/tasks');
    this.fbTasksRef.on('value', (snapshot) => {
      const task_list = snapshot.val();
      this.setState({task_list});
    });

  }

  componentWillUnmount(){
    firebase.removeBinding(this.fbTasksRef);
  }

  // ---------------------------------------------------------------------------
  onTaskNameChanged(event){
    const currrent_task = {
      ...this.state.currrent_task,
      name: event.target.value
    };
    this.setState({ currrent_task });
  }

  onTaskDescriptionChanged(event){
    let currrent_task = this.state.currrent_task;
    currrent_task.description = event.target.value;
    this.setState({ currrent_task });
  }

  onSaveCurrentTask(){
    const {
      id,
      name,
      description,
      completed
    } = this.state.currrent_task;

    if (id){
      // update existing task
      this.fbTasksRef.update({
        [id]:{
          ...this.state.task_list[id],
          name, description, completed
        }
      })
    }
    else {
      // push a new task
      this.fbTasksRef.push({
        name, description, completed
      })
    }
  }

  // ---------------------------------------------------------------------------
  // the "show completed" checkbox has been toggled
  onShowCompletedToggle(){
    const show_completed = !this.state.show_completed;
    // console.log(show_completed);
    this.setState({show_completed});
  }

  // ---------------------------------------------------------------------------
  // the keyword search has been changed
  onSearchChange(event){
    // console.log(event.target.value);
    this.setState({ keyword_search: event.target.value });
  }

  // ---------------------------------------------------------------------------
  // the "add a task" button has been clicked
  onAddTask(){
    // init a new task (flat format)
    const new_task = {
      id: null,
      name: "",
      description: "",
      completed: false
    };

    // console.log(new_task);
    this.setState({ currrent_task: new_task });
    // modal opens via bootstrap callbacks
  }

  // ---------------------------------------------------------------------------
  // an existing task has been clicked
  onEditTask(event, task){
    event.preventDefault();

    // get the selected task (in flat format)
    const selected_task = {
      ...this.state.task_list[task],
      id: task
    };

    // console.log(selected_task);
    this.setState({ currrent_task: selected_task });
    // open the modal
    $('#taskModal').modal();
  }

  // ---------------------------------------------------------------------------
  // mark a task as complete (checked), or not
  onTaskToggle(task){
    const id = task;
    const completed = !this.state.task_list[task].completed;
    // TODO: DRY update; this is very similar to part of onSaveCurrentTask
    if (id) {
      this.fbTasksRef.update({
        [id]:{
          ...this.state.task_list[id],
          completed
        }
      })
    }
  }

  // ---------------------------------------------------------------------------
  render() {
    const {
      currrent_task,
      task_list,
      show_completed,
      keyword_search,
    } = this.state;

    return (
      <div className="App container">

        {/* header, add task button, show completed toggle, keyword search */}
        <header>

          <div className="row">

            <div className="col-sm-4">
              <h1>TaskPro</h1>
              <p className="subtext">Click a checkbox next to a task to mark it complete (checked) or not.  Click any task detail to edit a task.</p>
            </div>

            <div className="col-sm-8 col-md-4 text-center">

              {/* TODO: turn this into a component */}
              <button
                id="add_task_btn"
                className="btn btn-primary icon"
                onClick={() => this.onAddTask()}
                data-toggle="modal"
                data-target="#taskModal"
                ><span>+</span>Add a task</button>

              <ShowCompletedCheckbox
                checked={show_completed}
                onToggle={this.onShowCompletedToggle}
                >Show Completed</ShowCompletedCheckbox>

              <KeywordSearch onSearchChange={(event) => this.onSearchChange(event)} />

            </div>
          </div>
        </header>

        {/* main/lists display */}
        <div className="row">

          <div className="col-sm-6 col-md-4">
            <TaskList
              tasks={task_list}
              show_completed={show_completed}
              keyword_search={keyword_search}
              sort_by="created_at"
              onEditTask={this.onEditTask}
              onTaskToggle={this.onTaskToggle}
              header_text="Main"
              sub_text="Sorted by creation date, most recent first."
              />
          </div>

          <div className="col-sm-6 col-md-4">

            <TaskList
              tasks={task_list}
              show_completed={show_completed}
              keyword_search={keyword_search}
              sort_by="priority"
              onEditTask={this.onEditTask}
              onTaskToggle={this.onTaskToggle}
              header_text="Priorities"
              sub_text="Sorted by priority, highest first."
              />

          </div>

          <div className="col-sm-6 col-md-4">

            <TaskList
              tasks={task_list}
              show_completed={show_completed}
              keyword_search={keyword_search}
              sort_by="deadline"
              onEditTask={this.onEditTask}
              onTaskToggle={this.onTaskToggle}
              header_text="Deadlines"
              sub_text="Sorted by deadline date."
              />

          </div>
        </div>

        {/* bootstrap modal */}
        <div className="modal fade" id="taskModal" tabIndex="-1" role="dialog" aria-labelledby="taskModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="taskModalLabel">Add/Edit Task</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <TaskEdit
                  task={currrent_task}
                  onTaskNameChanged={this.onTaskNameChanged}
                  onTaskDescriptionChanged={this.onTaskDescriptionChanged}
                  />

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.onSaveCurrentTask}
                  >Save changes</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
