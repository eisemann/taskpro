import React, { Component } from 'react';

// const isSearched =
//   searchTerm =>
//     item => s

class TaskList extends Component {
  render(){

    const {
      tasks,
      show_completed,
      keyword_search,
      sort_by,
      onTaskClick,
      onTaskToggle,
      header_text,
      sub_text,
    } = this.props;

    // the unordered list items that will represent visible tasks
    let list_items = [];

    // loops through the task list
    for (let task in tasks){

      const completed = tasks[task].completed;
      let class_name = "task";

      let push_task =
        !!keyword_search ?
          tasks[task].name.toLowerCase().includes(keyword_search.toLowerCase())
          : true ;

      if (completed){
        // When we are showing completed tasks,
        // we want this class applied so that the proper styles are applied.
        class_name += " completed";
        // When we are not showing completed tasks,
        // we'll skip pushing this task.
        if (!show_completed)
          push_task = false;
      }

      // Build the task list
      if (push_task){
        list_items.push(
          <li
            key={task}
            className={class_name}
            >

            {/* TODO: turn this into a component */}
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
