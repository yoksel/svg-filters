import React, { Component } from 'react';
import './FilterConstructorItem.css';

import InputText from '../InputText';
import InputSelect from '../InputSelect';

class FilterConstructorItem extends Component {
  render() {
    const primitive = this.props.primitive;
    const paramsValues = primitive.paramsValues;

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
        input = <InputSelect
          primitiveName={primitive.name}
          param={key}
          value={value}
          valuesList={paramsValues[key]}
          onChange={this.props.onChange}
        />;
      }

      return (
        <label key={index}>{key}={input}</label>
      );
    });

    return (
        <div
          className="FilterConstructorItem"
          >&lt;{primitive.name} {params}/>
        </div>
    );
  }
}

export default FilterConstructorItem;
