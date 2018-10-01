import React, { Component } from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';

// import {
//   formatDate,
//   parseDate,
// } from 'react-day-picker/moment';

import 'react-day-picker/lib/style.css';


class TaskEdit extends Component {



  render(){

    const NUMBER_OF_PRIORITY_OPTIONS = 10;

    const {
      task,
      onTaskNameChanged,
      onTaskDescriptionChanged,
      onDeadlineChanged,
    } = this.props;

    let priority_buttons = [];
    for (let i = 1; i <= NUMBER_OF_PRIORITY_OPTIONS; i++){
      priority_buttons.push(
        <button type="button" class="btn btn-secondary">{i}</button>
      )
    }


    return(

      task ?

        <div className="task-edit-container">
          <form>

{
/*
NOTE: the {prop.value || ''} code addresses the following warning that happens without it:
"Warning: A component is changing a controlled input of type text to be uncontrolled...."
*/
}
            <p className="task-label">Name</p>
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={task.name || ''}
              onChange={event => onTaskNameChanged(event)}
              />

            <p className="task-label">Description</p>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={task.description || ''}
              onChange={event => onTaskDescriptionChanged(event)}
              />

{/*
see http://react-day-picker.js.org/api/DayPickerInput
TODO: fix initial date formatting
*/}
            <p className="task-label">Deadline</p>
            <DayPickerInput
              value={task.deadline}
              onDayChange={date => onDeadlineChanged(date)}

              dayPickerProps={{
                selectedDay: task.deadline,
              }}
            />

            <p className="task-label">Priority</p>
            <div class="btn-group" role="group" aria-label="Basic example">
              {priority_buttons}
            </div>

{
/*
-points/hours
-subtasks
-tags
*/
}
          </form>
        </div>

      : null
    );
  }
}

export default TaskEdit;
