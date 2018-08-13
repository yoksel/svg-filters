import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PrimitivePanelControls from '../../containers/PrimitivePanelControls';

import {primitivesAttrs} from '../Data';

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
    const groupName = primitive.groupName;
    const groupData = primitivesAttrs[groupName];
    const primitiveName = groupData.name;
    const fieldsetProps = {};
    const hasChildren = primitive.children ? 'has-children' : 'no-children';
    const PrimitivePanelClass = `PrimitivePanel PrimitivePanel--${hasChildren}`;
    const PrimitivePanelContentClass = `PrimitivePanel__content PrimitivePanel__content--${hasChildren}`;

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

    return (
      <div className={PrimitivePanelClass}>
        <fieldset
          className="PrimitivePanel__fieldset"
          {...fieldsetProps}
        >
          <div className={PrimitivePanelContentClass}>
            <div className="PrimitivePanel__tag">
              {primitiveName}
            </div>
            {params}

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
}

export default PrimitivePanel;

PrimitivePanel.propTypes = {
  primitive: PropTypes.object,
  parentId: PropTypes.string,
  resultsList: PropTypes.array
};
