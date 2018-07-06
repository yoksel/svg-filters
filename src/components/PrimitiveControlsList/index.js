import React, {Component} from 'react';
import './PrimitiveControlsList.css';

class PrimitiveControlsList extends Component {

  render() {
    const primitives = this.props.primitiveControls;

    return (
      <div className="PrimitiveControlsList">
        <div>
          {primitives.map((primitive, index) => {
            return (
              <div
                key={primitive.id}
                className="PrimitiveControlsList__item"
                onClick={() => {
                  this.props.onClick(primitive);
                }}
              >
                {primitive.name}
              </div>
            );
          })}

        </div>

      </div>
    );
  }
}

export default PrimitiveControlsList;
