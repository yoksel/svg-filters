import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PrimitivePanelControls from '../../containers/PrimitivePanelControls';

import PrimitivePanelInput from '../PrimitivePanelInput';
import ResultAttribute from '../ResultAttribute';

import './PrimitivePanel.css';

class PrimitivePanel extends Component {
  render() {
    const {
      primitive,
      parentId,
      resultsList
    } = this.props;

    const params = Object.keys(primitive.params).map((key) => {
      const param = primitive.params[key];
      const {value} = param;

      if (key === 'result') {
        return (
          <ResultAttribute
            key={value}
            value={value} />
        );
      }

      return (
        <label
          key={key}
          className="PrimitivePanel__label"
        >{key}=<PrimitivePanelInput
            primitive={primitive}
            paramKey={key}
            resultsList={resultsList}
            parentId={parentId}
          />
        </label>
      );
    });


    if (!primitive.children) {
      return (
        <div className="PrimitivePanel">
          <div className="PrimitivePanel__content">
            &lt;{primitive.name}{params}&#8203;/>
            {primitive.children}
          </div>

          <PrimitivePanelControls
            id={primitive.id}
            parentId={parentId}
          />
        </div>
      );
    }

    return (
      <div className="PrimitivePanel PrimitivePanel--has-children">
        <div className="PrimitivePanel__content">
          <div className="PrimitivePanel__tag">
            &lt;{primitive.name}{params}&#8203;>
          </div>
          {primitive.children}
          <div className="PrimitivePanel__tag">
            &lt;/{primitive.name}&#8203;>
          </div>
        </div>
        <PrimitivePanelControls
          id={primitive.id}
        />
      </div>
    );
  }
}

export default PrimitivePanel;

PrimitivePanel.propTypes = {
  primitive: PropTypes.object,
  parentId: PropTypes.string,
  resultsList: PropTypes.array
};
