import React, { Component } from 'react';
import './Playground.css';

import Filter from '../Filter';

class Playground extends Component {
  render() {
    const filter = this.props.selected.length ? 'url(#filter)' : '';

    return (
      <div className="Playground">
        <div className="Playground__image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="250" height="320">
            <Filter
              selected={this.props.selected}/>

            <g filter={filter}>
              <image xlinkHref="http://placekitten.com/250/250"/>

              <text
                x="50%" y="280" dy="1em"
                textAnchor="middle">Some text</text>
            </g>
          </svg>
        </div>

        <Filter selected={this.props.selected} code/>
      </div>
    );
  }
}

export default Playground;
