import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

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
      resultsList,
      match
    } = this.props;

    const {section} = match.params;
    const primitiveDisabled = primitive.disabled;
    const groupName = primitive.groupName;
    const groupData = primitivesAttrs[groupName];
    const primitiveName = groupData.name;
    const inputsData = groupData.inputsData;
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
      let name = key;

      if (inputsData[key] && inputsData[key].name) {
        name = inputsData[key].name;
      }

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
        >{name}=<PrimitivePanelInput
            primitive={primitive}
            paramKey={key}
            parentId={parentId}
            resultsList={resultsList}
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

        {section !== 'docs' && <PrimitivePanelControls
          id={primitive.id}
          parentId={parentId}
          groupName={groupName}
          primitiveDisabled={primitiveDisabled}
        />}
      </div>
    );
  }
}

export default withRouter(PrimitivePanel);

PrimitivePanel.propTypes = {
  primitive: PropTypes.object,
  parentId: PropTypes.string,
  resultsList: PropTypes.array
};
