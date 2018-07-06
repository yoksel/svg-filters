import React, {Component} from 'react';
import './Playground.css';

import Filter from '../../containers/Filter';

class Playground extends Component {
  render() {
    const filterId = this.props.filterId;
    const filterUrl = filterId ? `url(#${filterId})` : '';

    return (
      <div className="Playground">
        <div className="Playground__image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="250" height="320">

            <Filter/>

            <g filter={filterUrl}>
              <image xlinkHref="http://placekitten.com/250/150"/>

              <rect x="50%" y="50%" width="50%" height="100" fill="teal"/>

              <circle r="70" cx="40%" cy="180" fill="gold" stroke="yellowgreen" strokeWidth="5"/>
              <text
                x="50%" y="260" dy="1em"
                textAnchor="middle">Some text</text>
            </g>
          </svg>
        </div>

        (code)
      </div>
    );
  }
}

export default Playground;
