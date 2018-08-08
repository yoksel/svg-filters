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

    const primitiveDisabled = primitive.disabled;
    const fieldsetProps = {};

    if (primitiveDisabled) {
      fieldsetProps.disabled = true;
    }

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

      if (param.disabled) {
        return null;
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
          <fieldset
            className="PrimitivePanel__fieldset"
            {...fieldsetProps}
          >
            <div className="PrimitivePanel__content">
              <div className="PrimitivePanel__tag">
                &lt;{primitive.name}
              </div>
              {params}&#8203;/>

              {primitive.children}
            </div>
          </fieldset>

          <PrimitivePanelControls
            id={primitive.id}
            parentId={parentId}
            primitiveDisabled={primitiveDisabled}
          />
        </div>
      );
    }

    return (
      <div className="PrimitivePanel PrimitivePanel--has-children">
        <fieldset
          className="PrimitivePanel__fieldset"
          {...fieldsetProps}
        >
          <div className="PrimitivePanel__content">
            <div className="PrimitivePanel__tag">
              &lt;{primitive.name}{params}&#8203;>
            </div>
            {primitive.children}
            <div className="PrimitivePanel__tag">
              &lt;/{primitive.name}&#8203;>
            </div>
          </div>
        </fieldset>
        <PrimitivePanelControls
          id={primitive.id}
          primitiveDisabled={primitiveDisabled}
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
