import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import './Tabs.css';

const Tabs = ({items, active}) => {
  const tabsList = items.reduce((prev, item) => {
    const id = item.id;
    const name = item.name;
    const url = `${process.env.PUBLIC_URL}/${id}`;
    let buttonClass = 'Tabs__control';
    if (id === active) {
      buttonClass += ` ${buttonClass}--active`;
    }

    const control = (
      <NavLink
        key={id}
        to={url}
        className={buttonClass}
      >
        <span className="Tabs__control-text">
          {name}
        </span>
      </NavLink>
    );

    let contentClass = 'Tabs__item';
    if (id === active) {
      contentClass += ` ${contentClass}--active`;
    }
    const content = <div
      key={id}
      className={contentClass}
    ><item.content/></div>;

    prev.controls.push(control);
    prev.tabs.push(content);

    return prev;
  },{
    controls: [],
    tabs: []
  });

  return (
    <div className="Tabs">
      <div className="Tabs__controls">
        {tabsList.controls}
      </div>
      {tabsList.tabs}
    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  active: PropTypes.string,
  items: PropTypes.array
};
