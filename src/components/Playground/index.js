import React from 'react';
import './Playground.css';
import PropTypes from 'prop-types';

import grayCells from './gray-cells.png';

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
          style={{background: `url(${grayCells})`}}>

          <defs>
            <Filter/>
          </defs>

          <image
            x="20" y="20"
            width="250" height="151"
            xlinkHref="http://placekitten.com/250/151"
            filter={filterUrl}
          />

          <g filter={filterUrl}>
            <rect width="1" height="1" fill="none"/>

            <path d='M0,310 1000,310'
              strokeWidth="10"
              stroke="yellowgreen"/>
          </g>

          <g filter={filterUrl}>
            <rect x="50%" y="53%"
              width="40%" height="40%"
              fill="teal"
              stroke="lightseagreen" strokeWidth="10"/>

            <circle r="50" cx="40%" cy="240"
              fill="gold"
              stroke="tomato" strokeWidth="10"
            />
          </g>

          <g filter={filterUrl}>
            <text
              x="50%" y="280" dy="1em"
              textAnchor="middle">Some text</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Playground;

Playground.propTypes = {
  filterId: PropTypes.string
};
