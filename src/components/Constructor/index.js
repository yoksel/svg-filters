import React, {Component} from 'react';

import deepClone from '../../helpers/deepClone';

import PrimitivePanel from '../PrimitivePanel';

import './Constructor.css';

const getResultsList = (primitives, index) => {
  return primitives.slice(0, index)
    .map(item => item.params.result.value);
};

class Contsructor extends Component {
  render() {
    const primitives = this.props.primitives;

    return (
      <div className="Contsructor">
        &lt;filter id="#filter">
        <div className="Contsructor__container">
          {primitives.map((primitive, index) => {

            if (primitive.children && primitive.children.length > 0) {
              primitive = deepClone(primitive);

              primitive.children = primitive.children.map(item => {
                return (
                  <div
                    key={item.params.result.value}
                    className="Contsructor__item">
                    <PrimitivePanel
                      parent={primitive.id}
                      primitive={item}
                      resultsList={getResultsList(primitives, index)}
                    />
                  </div>
                );
              });
            }

            return (
              <div
                key={primitive.params.result.value}
                className="Contsructor__item">
                <PrimitivePanel
                  primitive={primitive}
                  resultsList={getResultsList(primitives, index)}
                />
              </div>
            );
          })}
        </div>

        &lt;/filter>
      </div>
    );
  }
}

export default Contsructor;
