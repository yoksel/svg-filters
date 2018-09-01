import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {primitivesAttrs} from '../Data';

import './ControlsList.css';

const ControlsList = ({items, control = 'button', addPrimitive, match}) => {
  const {section = 'playground', id} = match.params;
  const ControlsListClass = [
    'ControlsList',
    `ControlsList--${section}`
  ].join(' ');


  return (
    <nav className={ControlsListClass}>
      {items.map((item, index) => {
        const groupData = primitivesAttrs[item.groupName];
        const ControlClassList = [
          'Control',
          `Control--${control}`,
          `Control-${section}`
        ];

        if (id === item.id) {
          ControlClassList.push('Control--current');
          ControlClassList.push(`Control-${section}--current`);
        }

        const ControlClass = ControlClassList.join(' ');

        let name = item.name;
        if (item.groupName) {
          // primitives
          name = groupData.name;
        }

        if (control === 'NavLink') {
          const url = `/${section}/${item.id}`;

          return (
            <NavLink
              key={item.id}
              to={url}
              className={ControlClass}
            >
              <span className="Control__text">
                {name}
              </span>
            </NavLink>
          );
        }

        return (
          <button
            className={ControlClass}
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
    </nav>
  );
};

export default withRouter(ControlsList);

ControlsList.propTypes = {
  items: PropTypes.array,
  control: PropTypes.string,
  addPrimitive: PropTypes.func
};
