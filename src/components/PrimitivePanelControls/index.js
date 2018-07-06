import React, {Component} from 'react';

import Icon from '../Icon';

import './PrimitivePanelControls.css';

class PrimitivePanelControls extends Component {
  render() {
    const {duplicatePrimitive, removePrimitive} = this.props;

    return (
      <div className="PrimitivePanelControls">
        <button
          className="PrimitivePanelControl"
          onClick={duplicatePrimitive}
          type="button"
        >
          <Icon
            symbol="plus"
            color="currentColor"
            size="12"/>
        </button>
        <button
          className="PrimitivePanelControl"
          type="button"
          onClick={removePrimitive}
        >
          <Icon
            symbol="cross"
            color="currentColor"
            size="11"/>
        </button>
      </div>
    );
  }
}

export default PrimitivePanelControls;
