import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import PrimitivePanelControls from '../../containers/PrimitivePanelControls';
import Docs from '../../containers/Docs';

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
      parentHasSingleChild,
      noChangesForChildren,
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
    const PrimitivePanelContentClass = `PrimitivePanel__content PrimitivePanel__content--${hasChildren}`;
    const hasResult = Boolean(primitive.params.result);

    const PrimitivePanelClassList = [
      'PrimitivePanel',
      `PrimitivePanel--${hasChildren}`
    ];

    if (!hasResult) {
      PrimitivePanelClassList.push('PrimitivePanel--no-result');
    }

    if (primitiveDisabled) {
      fieldsetProps.disabled = true;
    }

    const params = Object.keys(primitive.params).map((key) => {
      const param = primitive.params[key];
      const {value} = param;
      let name = key;

      if (inputsData && inputsData[key] && inputsData[key].name) {
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

    const getPanelControls = () => {
      return <PrimitivePanelControls
        id={primitive.id}
        parentId={parentId}
        groupName={groupName}
        section={section}
        primitiveDisabled={primitiveDisabled}
        hasResult={hasResult}
        hasChildrenMod={hasChildren}
        parentHasSingleChild={parentHasSingleChild}
        noChangesForChildren={noChangesForChildren}
      />;
    };

    return (
      <div className={PrimitivePanelClassList.join(' ')}>
        <fieldset
          className="PrimitivePanel__fieldset"
          {...fieldsetProps}
        >
          <div className={PrimitivePanelContentClass}>
            <div className="PrimitivePanel__tag">
              {primitiveName}
            </div>
            {params}

            {primitive.showDocs && <Docs
              docId={primitive.groupName}
              id={primitive.id}
              parentId={parentId}
              embeded/>
            }

            <div className="PrimitivePanel__children">
              {primitive.children}
            </div>
          </div>
        </fieldset>

        {getPanelControls()}
      </div>
    );
  }
}

export default withRouter(PrimitivePanel);

PrimitivePanel.propTypes = {
  primitive: PropTypes.object,
  parentId: PropTypes.string,
  resultsList: PropTypes.array,
  parentHasSingleChild: PropTypes.bool,
  noChangesForChildren: PropTypes.bool,
};
