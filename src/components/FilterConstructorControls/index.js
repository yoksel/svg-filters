import React, { Component } from 'react';
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
            type="button">+</button>
          <button
            className="FilterConstructorControl"
            type="button"
            onClick={() => {
              this.props.removePrimitive(this.props.id)
            }}
            >x</button>
        </div>
    );
  }
}

export default FilterConstructorControls;
