import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {primitivesAttrs} from '../Data';

import PrimitivePanelInputText from '../PrimitivePanelInputText';
import PrimitivePanelInputSelect from '../PrimitivePanelInputSelect';
import PrimitivePanelInputTextarea from '../PrimitivePanelInputTextarea';

class PrimitivePanelInput extends Component {
  render() {
    const {primitive, paramKey} = this.props;
    const groupData = primitivesAttrs[primitive.groupName];
    let type = groupData.inputsData[paramKey].type;

    if (primitive.params[paramKey].type) {
      // to get switched types in colormatrix
      type = primitive.params[paramKey].type;
    }

    if (type === 'textarea') {
      return (
        <PrimitivePanelInputTextarea {...this.props}/>
      );
    } else if (type !== 'select') {
      return (
        <PrimitivePanelInputText {...this.props}/>
      );
    } else {
      return (
        <PrimitivePanelInputSelect {...this.props}/>
      );
    }
  }
}

export default PrimitivePanelInput;

PrimitivePanelInput.propTypes = {
  primitive: PropTypes.object,
  paramKey: PropTypes.string,
  resultsList: PropTypes.array,
  parentId: PropTypes.string
};
