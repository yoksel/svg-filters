import React, { Component } from 'react';

import Icon from '../Icon';

import './FilterConstructorControls.css';

class FilterConstructorControls extends Component {
  render() {
    // console.log(this.props);

    return (
        <div className="FilterConstructorControls">
          <button
            className="FilterConstructorControl"
            onClick={() => {
              this.props.addPrimitive(this.props.id)
            }}
            type="button">
              <Icon
                symbol="plus"
                color="currentColor"
                size="12"/>
            </button>
          <button
            className="FilterConstructorControl"
            type="button"
            onClick={() => {
              this.props.removePrimitive(this.props.id)
            }}
            >
              <Icon
                symbol="cross"
                color="currentColor"
                size="11"/>
            </button>
        </div>
    );
  }
}

export default FilterConstructorControls;
