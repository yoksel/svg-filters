import React, { Component } from 'react';

import InputText from '../InputText';
import InputSelect from '../InputSelect';
import primitivesAttrs from '../Data/primitivesAttrs.json';
import './FilterConstructorItem.css';

class FilterConstructorItem extends Component {
  render() {
    const primitive = this.props.primitive;
    const paramsValues = primitive.paramsValues;
    let resultsList = Object.keys(this.props.results);

    if (resultsList.length) {
      resultsList.pop();
    }

    const params = Object.keys(primitive.params).map((key, index) => {
      const param = primitive.params[key];
      const value = param.value;

      let input = <InputText
        primitiveName={primitive.name}
        param={key}
        value={value}
        type={param.type}
        onChange={this.props.onChange}
      />;

      if (param.type === 'select') {
        let valuesList = paramsValues && paramsValues[key];

        if (!valuesList) {
          valuesList = primitivesAttrs[key];
        }

        if(key === 'in') {
          valuesList = valuesList.concat(resultsList);
        }

        input = <InputSelect
          primitiveName={primitive.name}
          param={key}
          value={value}
          valuesList={valuesList}
          onChange={this.props.onChange}
        />;
      }

      return (
        <label className="FilterConstructorItem__label" key={index}>{key}={input}</label>
      );
    });

    const result = () => {
      return (
        <span className="FilterConstructorItem__result">
        result=
          "<span className="FilterConstructorItem__result-name">
            {primitive.resultName}
          </span>"
        </span>
      );
    };

    return (
        <div
          className="FilterConstructorItem"
          >&lt;{primitive.name}{params}{result()}/>
        </div>
    );
  }
}

export default FilterConstructorItem;
