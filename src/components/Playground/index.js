import React, {Component} from 'react';
import './Playground.css';
import PropTypes from 'prop-types';

import Filter from '../../containers/Filter';

const Playground = ({filterId}) => {
  const filterUrl = filterId ? `url(#${filterId})` : '';

  return (
    <div className="Playground">
      <div className="Playground__image">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="Playground__svg"
          width="250" height="320">

          <Filter/>

          <image
            xlinkHref="http://placekitten.com/250/150"
            filter={filterUrl}
          />

          <g filter={filterUrl}>
            <rect x="50%" y="50%" width="50%" height="100" fill="teal"/>

            <circle r="70" cx="40%" cy="180" fill="gold" stroke="yellowgreen" strokeWidth="5"
            />
            <text
              x="50%" y="260" dy="1em"
              textAnchor="middle">Some text</text>
          </g>
        </svg>
      </div>

      (code)
    </div>
  );
};

export default Playground;

Playground.propTypes = {
  filterId: PropTypes.string
};
