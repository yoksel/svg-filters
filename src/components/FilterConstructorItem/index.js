import React, { Component } from 'react';

import { primitivesAttrs } from '../Data';
import InputText from '../InputText';
import InputSelect from '../InputSelect';
import FilterConstructorControls from '../FilterConstructorControls';
import './FilterConstructorItem.css';

class FilterConstructorItem extends Component {
  render() {
    const primitive = this.props.primitive;
    const paramsValues = primitive.paramsValues;
    let resultsList = Array.from(this.props.resultsList);

    const getResultAttr = (resultId) => {
      return (
        <span key="result" className="FilterConstructorItem__result">
        result="<span className='FilterConstructorItem__result-name'>
            {resultId}
          </span>"
        </span>
      );
    };

    const params = Object.keys(primitive.params).map((key, index) => {
      const param = primitive.params[key];
      const value = param.value;

      if (key === 'result') {
        return getResultAttr(param);
      }

      // Default types text/number
      let input = <InputText
        id={primitive.id}
        param={key}
        value={value}
        type={param.type}
        onChange={this.props.onChange}
      />;

      // Select
      if (param.type === 'select') {
        let valuesList = paramsValues && paramsValues[key];

        if (!valuesList) {
          valuesList = primitivesAttrs[key];
        }

        if(key === 'in') {
          valuesList = valuesList.concat(resultsList);
        }

        input = <InputSelect
          id={primitive.id}
          param={key}
          value={value}
          valuesList={valuesList}
          onChange={this.props.onChange}
        />;
      }

      return (
        <label
          key={key}
          className="FilterConstructorItem__label"
          >{key}={input}</label>
      );
    });

    const classNameInit = "FilterConstructorItem";
    let className = classNameInit;

    if(this.props.isDragging) {
      className += ` ${classNameInit}--dragging`;
    }

    if(this.props.isDroppable) {
      className += ` ${classNameInit}--droppable`;
    }

    return (
        <div
          className={className}
          >&lt;{primitive.name}{params}&#8203;/>
          <FilterConstructorControls
            id={primitive.id}
            selected={this.props.selected}
            addPrimitive={this.props.addPrimitive}
            removePrimitive={this.props.removePrimitive}
            />
        </div>
    );
  }
}

export default FilterConstructorItem;
