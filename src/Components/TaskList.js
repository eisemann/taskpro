import React, { Component } from 'react';


class TaskList extends Component {
  render(){

    const {
      tasks,
      show_completed,
      keyword_search,
      sort_by,
      onEditTask,
      onTaskToggle,
      header_text,
      sub_text,
    } = this.props;


    let list_data = [];

    // loop through the master task list
    for (let task in tasks){

      const task_data = {
        ...tasks[task],
        task
      };

      // push the task?
      let push_task =
        !!keyword_search ?
          // if the keyword search matches the task name
          tasks[task].name.toLowerCase().includes(keyword_search.toLowerCase())
          // if we are not doing a keyword search
          : true ;

      // if the show completed toggle is off
      // and the task isn't completed, don't push the task
      if (push_task && !show_completed)
        push_task = !task_data.completed;

      // if we are sorting, only push the task if the sort field value is set
      if (push_task && sort_by === "deadline")
        push_task = !!task_data.deadline;
      else if (push_task && sort_by === "priority")
        push_task = !!task_data.priority;

      // push the task?
      if (push_task)
        list_data.push(task_data);
    }

    // if we are sorting, do it
    if (sort_by === "deadline"){
      list_data.sort((a, b) => {
          if (a.deadline < b.deadline) {return -1;}
          if (a.deadline > b.deadline) {return 1;}
          return 0;
      });
    }
    else if (sort_by === "priority"){
      list_data.sort((a, b) => parseInt(b.priority) - parseInt(a.priority) );
    }


    return(

      <div className="task-container">

        <h4>{header_text}</h4>
        <p className="subtext">{sub_text}</p>

        <ul className="task-list">
          {
            list_data.map( task_data_item =>

                <li
                  key={task_data_item.task}
                  className={"task " + (task_data_item.completed ? " completed " : "")}
                  >

                  {/* TODO: turn this into a component */}
                  <input
                    type="checkbox"
                    checked={task_data_item.completed}
                    onChange={() => onTaskToggle(task_data_item.task)}
                    />
                  <a
                    href="#edit"
                    onClick={(event) => onEditTask(event, task_data_item.task)}
                    ><span>{task_data_item.name}</span></a>

                </li>
            )
          }
        </ul>

      </div>

    );
  }
}

export default TaskList;
