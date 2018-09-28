import React from 'react';

const KeywordSearch = ({value, onSearchChange}) =>
  <form>
    <input
      type="text"
      className="form-control"
      placeholder="Search"
      onChange={event => onSearchChange(event)}
      />
  </form>

export default KeywordSearch;
