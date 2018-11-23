import React, {Component} from 'react';

import InputRadio from '../../containers/PrimitivePanelInputRadio';

import './PrimitivePanelSwitcher.css';

class PrimitivePanelSwitcher extends Component {
  render() {
    const {id, parentId, primitiveDisabled} = this.props;

    let input = <InputRadio
      id={id}
      key={id}
      parentId={parentId}
      name={parentId}
      checked={!primitiveDisabled}
      value={`${parentId}__${id}`}
      hidden={true}
    />;

    return (
      <div className="PrimitivePanelSwitcher">
        <label className="PrimitivePanelSwitcher__label">
          {input}
          <span className="PrimitivePanelSwitcher__control"></span>
        </label>
      </div>
    );
  }
}

export default PrimitivePanelSwitcher;
