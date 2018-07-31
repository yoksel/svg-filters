import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import './ControlsList.css';

const ControlsList = ({items, control, onClick}) => {
  return (
    <div className="ControlsList">
      {items.map((item) => {

        if (control === 'NavLink') {
          const url = `${process.env.PUBLIC_URL}/presets/${item.id}`;

          return (
            <NavLink
              key={item.id}
              to={url}
            >
              <span className="Control Control--navlink">
                {item.name}
              </span>
            </NavLink>
          );
        }

        return (
          <button
            className="Control"
            key={item.id}
            onClick={() => {
              onClick(item);
            }}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default ControlsList;

ControlsList.propTypes = {
  items: PropTypes.array
};
