import React, { Component } from 'react';

// firebase --------------------------------------------------------------------
// import firebase from './firebase';

// bootstrap styles and js -----------------------------------------------------
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// styles ----------------------------------------------------------------------
import './App.css';

// Components ------------------------------------------------------------------
import KeywordSearch from './Components/KeywordSearch';
import TaskEdit from './Components/TaskEdit';
import TaskList from './Components/TaskList';


const test_data = {
  tasks: {
    5: {
      name: 'read from fb',
      completed: false
    },
    4: {
      name: 'data linkage',
      completed: false
    },
    3: {
      name: 'generate test data',
      completed: false
    },
    2: {
      name: 'init project',
      completed: true
    },
    1: {
      name: 'Set up project',
      completed: true
    }
  }
};


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currrent_task: null,
      task_list: test_data.tasks,
      show_completed: true,
      keyword_search: null,
      tag_search: null,
    };

    this.onTaskNameChanged = this.onTaskNameChanged.bind(this);
    this.onTaskDescriptionChanged = this.onTaskDescriptionChanged.bind(this);

    this.onShowCompletedToggle = this.onShowCompletedToggle.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.onAddTask = this.onAddTask.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onTaskToggle = this.onTaskToggle.bind(this);

    document.title = "TaskPro"
  }

  // ---------------------------------------------------------------------------
  onTaskNameChanged(event){
    // let currrent_task = this.state.currrent_task;
    // currrent_task.name = event.target.value;
    const currrent_task = {
      ...this.state.currrent_task,
      name: event.target.value
    };
    this.setState({ currrent_task });
  }

  onTaskDescriptionChanged(event){
    // let currrent_task = this.state.currrent_task;
    // currrent_task.description = event.target.value;
    // this.setState({ currrent_task });
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
      id: new Date().valueOf(),
      name: "",
      description: "",
      completed: false
    };
    console.log(new_task);
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

    // console.log(task);
    console.log(selected_task);
    this.setState({ currrent_task: selected_task });
    // open the modal
    $('#taskModal').modal();
  }

  // ---------------------------------------------------------------------------
  // mark a task as complete (checked), or not
  onTaskToggle(task){

    const updated_task = {
      ...this.state.task_list[task],
      completed: !this.state.task_list[task].completed
    };

    let task_list = {
      ...this.state.task_list,
      [task]: updated_task
    };

    this.setState({ task_list });
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

              {/* TODO: turn this into a component */}
              <p>
                <input
                  type="checkbox"
                  className="show-completed"
                  checked={show_completed}
                  onChange={() => this.onShowCompletedToggle()}
                  />
                <label htmlFor="show_completed">Show Completed</label>
              </p>

              <KeywordSearch
                onSearchChange={(event) => this.onSearchChange(event)}
                />

            </div>

          </div>

        </header>


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
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
