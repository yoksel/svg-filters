import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PrimitivePanelControls from '../../containers/PrimitivePanelControls';

import PrimitivePanelInput from '../PrimitivePanelInput';
import ResultAttribute from '../ResultAttribute';

import './PrimitivePanel.css';

class PrimitivePanel extends Component {

  onMouseDown = (event) => {
    const {
      index,
      primitive,
      parentId,
      startDrag,
      getSiblingsCoords
    } = this.props;

    const className = event.target.className;

    if (className === 'PrimitivePanel') {
      const elemClientRect = event.target.getBoundingClientRect();
      const middleY = elemClientRect.y + elemClientRect.height / 2;

      startDrag({
        id: primitive.id,
        index: index,
        parentId: parentId,
        elemClientRect: elemClientRect,
        offset: {
          x: event.nativeEvent.x - elemClientRect.x,
          y: event.nativeEvent.y - elemClientRect.y,
          middleY: event.nativeEvent.y - middleY
        },
        getSiblingsCoords: getSiblingsCoords
      });
    }
  };

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
        <div className="PrimitivePanel"
          onMouseDown={this.onMouseDown}>
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
  }
}

export default PrimitivePanel;

PrimitivePanel.propTypes = {
  primitive: PropTypes.object,
  parentId: PropTypes.string
};
