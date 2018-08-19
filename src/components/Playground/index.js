import React from 'react';
import './Playground.css';
import PropTypes from 'prop-types';

import grayCells from './gray-cells.png';

import Filter from '../../containers/Filter';

const Playground = ({filterId}) => {
  const filterUrl = filterId ? `url(#${filterId})` : '';

  return (
    <section className="Playground">
      <h2 className="visuallyhidden">Live demo</h2>
      <div className="Playground__image">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="Playground__svg"
          style={{background: `url(${grayCells})`}}>

          <defs>
            <circle id="circle"
              r="50" cx="70" cy="260"
              fill="gold"
              stroke="darkorange"
              strokeWidth="10"
            />

            <Filter/>
          </defs>

          <image
            x="5%" y="20"
            width="90%" height="200"
            preserveAspectRatio="xMidYMid meet"
            xlinkHref="https://placekitten.com/400/200"
            filter={filterUrl}
          />

          <g filter={filterUrl}>
            <text
              x="50%" y="320"
              textAnchor="middle">Text</text>
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Playground;

Playground.propTypes = {
  filterId: PropTypes.string
};
