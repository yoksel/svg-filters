import React, {Component} from 'react';
import PrimitivePanel from '../PrimitivePanel';

import './Constructor.css';

const getResultsList = (primitives, index) => {
  return primitives.slice(0, index)
    .map(item => item.params.result);
};

class Contsructor extends Component {
  render() {
    const primitives = this.props.primitives;

    return (
      <div className="Contsructor">
        &lt;filter id="#filter">
        <div className="Contsructor__container">
          {primitives.map((primitive, index) => {

            return (
              <div
                key={primitive.params.result}
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
