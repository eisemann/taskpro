import React, { Component } from 'react';

// import firebase from './firebase';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
      name: 'set up project',
      completed: true
    }
  }
};


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task_list: test_data.tasks,
    };

    this.onTaskToggle = this.onTaskToggle.bind(this);

    document.title = "TaskPro"
  }

  onTaskToggle(task_id){

  }

  render() {
    const { task_list, } = this.state;
    return (
      <div className="App container">
        <header>

          <h1>TaskPro</h1>

          {/* TODO: turn this in to a component */}
          <div className="row">

            <div className="col-sm-4">
              <input type="text" className="form-control" placeholder="Search"/>
            </div>

            <div className="col-sm-4">
              ... show completed ...
            </div>

          </div>

        </header>

        <div className="row">

          <div className="col-sm-4">
            <TaskList
              tasks={task_list}
              onTaskToggle={this.onTaskToggle}
              header_text="Main"
              sub_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
          </div>

          <div className="col-sm-4">

            <TaskList
              tasks={null}
              header_text="Priorities"
              sub_text="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              />

          </div>

          <div className="col-sm-4">

            <TaskList
              tasks={null}
              header_text="Deadlines"
              sub_text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              />

          </div>
        </div>

      </div>
    );
  }
}

export default App;
