import React, { Component } from 'react';
import './Primitive.css';

class Primitive extends Component {
  render() {
    const primitive = this.props.primitive;
    return (
        <div
          className="Primitive">
          {primitive.name}
        </div>
    );
  }
}

export default Primitive;
