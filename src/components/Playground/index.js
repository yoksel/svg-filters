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
            width="360" height="160"
            preserveAspectRatio="xMidYMid slice"
            xlinkHref="http://placekitten.com/250/160"
            filter={filterUrl}
          />

          <g filter={filterUrl}>
            <rect x="275" y="210"
              width="100" height="100"
              fill="teal"
              stroke="lightseagreen" strokeWidth="10"/>

            <circle r="50" cx="70" cy="260"
              fill="gold"
              stroke="darkorange"
              strokeWidth="10"
            />
          </g>

          <g filter={filterUrl}>
            <text
              x="50%" y="280"
              textAnchor="middle">Text</text>
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
