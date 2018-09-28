import React, { Component } from 'react';


class TaskEdit extends Component {
  render(){

    const {
      task,
      onTaskNameChanged,
      onTaskDescriptionChanged,
    } = this.props;

    return(

      task ?

        <div className="task-edit-container">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={task.name}
              onChange={event => onTaskNameChanged(event)}
              />

            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={task.description}
              onChange={event => onTaskDescriptionChanged(event)}
              />

            <p>subtasks</p>
            <p>points/hours</p>
            <p>deadline</p>
            <p>tags</p>
          </form>
        </div>

      : null

    );
  }
}

export default TaskEdit;
