import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PrimitivePanelInputText from '../../components/PrimitivePanelInputText';
import PrimitivePanelInputSelect from '../../components/PrimitivePanelInputSelect';
import PrimitivePanelInputTextarea from '../../components/PrimitivePanelInputTextarea';

import './PrimitivePanelInput.css';

class PrimitivePanelInput extends Component {
  render() {
    const {primitive, paramKey} = this.props;

    const type = primitive.params[paramKey].type;

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
