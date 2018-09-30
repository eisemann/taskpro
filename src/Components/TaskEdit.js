import React, { Component } from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'react-day-picker/lib/style.css';


class TaskEdit extends Component {
  render(){

    const {
      task,
      onTaskNameChanged,
      onTaskDescriptionChanged,
      onDeadlineChanged,
    } = this.props;

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
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={task.name || ''}
              onChange={event => onTaskNameChanged(event)}
              />

            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={task.description || ''}
              onChange={event => onTaskDescriptionChanged(event)}
              />



            <DayPickerInput
              value={task.deadline}
              onDayChange={date => onDeadlineChanged(date)}
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder={`Deadline (e.g. ${formatDate(new Date())})`}

              dayPickerProps={{
                selectedDay: task.deadline,
              }}
            />

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
