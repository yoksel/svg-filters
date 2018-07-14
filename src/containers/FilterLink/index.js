import React from 'react';
import {NavLink} from 'react-router-dom';

const FilterLink = ({filter, children}) => {
  return (
    <NavLink
      to={filter === 'SHOW_ALL' ? '/' : `/${filter}`}
    >
      {children}
    </NavLink>
  );
};

export default FilterLink;
