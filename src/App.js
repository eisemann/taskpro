import React, { Component } from 'react';

// import firebase from './firebase';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount(){
    document.title = "TaskPro"
  }

  render() {
    return (
      <div className="App container">
        <header>
          <h1>TaskPro</h1>
          <p>Search</p>
        </header>

        <div className="row">

          <div className="col-sm-4">
            <div className="task-container">
              <h2>Main</h2>
              <p>list of all tasks</p>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="task-container">
              <h2>Priorities</h2>
              <p>...</p>
            </div>

          </div>

          <div className="col-sm-4">

            <div className="task-container">
              <h2>Deadlines</h2>
              <p>...</p>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
