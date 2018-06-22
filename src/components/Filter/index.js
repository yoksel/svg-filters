import React, { Component, Fragment } from 'react';
import './Filter.css';

class Filter extends Component {
  getPrimitives() {
    const isCode = this.props.code;

    return this.props.selected.map( (primitive, index) => {
      const paramsKeys = Object.keys(primitive.params);
      const params = paramsKeys.reduce((prev, param) => {
        const value = primitive.params[param].value;

        prev.obj[param] = value;
        prev.list.push(`${param}="${value}`);
        return prev;
      }, {obj: {}, list: []});

      if(isCode) {
        return `<${primitive.name} ${params.list.join(' ')}/>`;
      }

      return (
        <primitive.name key={index} {...params.obj}/>
      );
    });
  }

  getCode() {
return `<filter id="filter">
  ${this.getPrimitives().join('\n  ')}
</filter>`;
  }

  render() {
    const isCode = this.props.code;

    if (isCode) {
      return (<Fragment>
          <textarea className="FilterCode" value={this.getCode()} onChange={() => {}}/>
        </Fragment>
      );
    }

    return (
      <filter id="filter">
        {this.getPrimitives()}
      </filter>
    );
  }
}

export default Filter;
