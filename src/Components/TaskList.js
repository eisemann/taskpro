import React, { Component } from 'react';

class TaskList extends Component {
  render(){

    const {
      tasks,
      show_completed,
      sort_by,
      onTaskClick,
      onTaskToggle,
      header_text,
      sub_text,
    } = this.props;

    let list_items = [];

    for(let task in tasks){

      const completed = tasks[task].completed;
      let class_name = "task";
      let push_task = true;

      if (completed){
        // NOTE: when we are showing completed tasks,
        // we want this class applied so that the proper styles are applied.
        class_name += " completed";
        // NOTE: when we are not showing completed tasks,
        // we'll skip pushing this task.
        if (!show_completed)
          push_task = false;
      }

      if (push_task){
        list_items.push(
          <li
            key={task}
            className={class_name}
            >

            <input
              type="checkbox"
              checked={completed}
              onChange={() => onTaskToggle(task)}
              />
            <a
              href="#edit"
              onClick={(event) => onTaskClick(event, task)}
              ><span>{tasks[task].name}</span></a>

          </li>
        )

      }
    }

    return(

      <div className="task-container">

        <h4>{header_text}</h4>
        <p className="subtext">{sub_text}</p>

        <ul className="task-list">
          {list_items}
        </ul>

      </div>

    );
  }
}

export default TaskList;
