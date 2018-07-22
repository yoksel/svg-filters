import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../../containers/InputText';
import InputSelect from '../../containers/InputSelect';
import PrimitivePanelControls from '../../containers/PrimitivePanelControls';

import PrimitivePanelInput from '../PrimitivePanelInput';
import ResultAttribute from '../ResultAttribute';
import {primitivesAttrs} from '../Data';

import './PrimitivePanel.css';

const PrimitivePanel = ({primitive, parentId, onChange, resultsList}) => {
  resultsList = Array.from(resultsList);

  const params = Object.keys(primitive.params).map((key) => {
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
        &lt;{primitive.name}{params}&#8203;/>

        <PrimitivePanelControls
          id={primitive.id}
          parentId={parentId}
        />
        {primitive.children}
      </div>
    );
  }

  return (
    <div className="PrimitivePanel PrimitivePanel--has-children">
      <div className="PrimitivePanel__tag">
        &lt;{primitive.name}{params}&#8203;>
      </div>
      <PrimitivePanelControls
        id={primitive.id}
      />
      {primitive.children}
      <div className="PrimitivePanel__tag">
        &lt;/{primitive.name}&#8203;>
      </div>
    </div>
  );
};

export default PrimitivePanel;

PrimitivePanel.propTypes = {
  primitive: PropTypes.object,
  parentId: PropTypes.string,
  onChange: PropTypes.func
};
