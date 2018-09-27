import React, { Component } from 'react';

class TaskList extends Component {
  render(){

    const {
      tasks,
      onTaskToggle,
      header_text,
      sub_text,
    } = this.props;

    let list_items = [];

    for(let task in tasks){

      let class_name = "task";
      if (tasks[task].completed)
        class_name += " completed";

      list_items.push(
        <li
          key={task}
          className={class_name}
          >

          <input type="checkbox"/>
          <span>{tasks[task].name}</span>

        </li>
      )
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
