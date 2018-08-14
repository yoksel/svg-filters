import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {primitivesAttrs} from '../Data';

import './ControlsList.css';

const ControlsList = ({items, control, addPrimitive, match}) => {
  const {section} = match.params;

  return (
    <div className="ControlsList">
      {items.map((item, index) => {
        const groupData = primitivesAttrs[item.groupName];
        let name = item.name;
        if (item.groupName) {
          // primitives
          name = groupData.name;
        }

        if (control === 'NavLink') {
          const url = `${process.env.PUBLIC_URL}/${section}/${item.id}`;

          return (
            <NavLink
              key={item.id}
              to={url}
            >
              <span className="Control Control--navlink">
                {name}
              </span>
            </NavLink>
          );
        }

        return (
          <button
            className="Control"
            key={item.id}
            onMouseDown={(event) => {
              const nativeEvent = {
                offsetX: event.nativeEvent.offsetX,
                offsetY: event.nativeEvent.offsetY
              };

              addPrimitive({
                item,
                nativeEvent
              });
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default withRouter(ControlsList);

ControlsList.propTypes = {
  items: PropTypes.array
};
