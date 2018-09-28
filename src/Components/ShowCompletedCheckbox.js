import React from 'react';

const ShowCompletedCheckbox = ({checked, onToggle, children}) =>
  <p>
    <input
      id="show_completed"
      type="checkbox"
      className="show-completed"
      checked={checked}
      onChange={() => onToggle()}
      />
    <label htmlFor="show_completed">{children}</label>
  </p>

export default ShowCompletedCheckbox;
