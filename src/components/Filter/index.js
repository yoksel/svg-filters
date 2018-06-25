import React, { Component, Fragment } from 'react';
import './Filter.css';

class Filter extends Component {
  getPrimitives() {
    const divider = '\n\t\t';
    const isCode = this.props.code;

    return this.props.selected.map( (primitive, index) => {
      const paramsKeys = Object.keys(primitive.params);
      const params = paramsKeys.reduce((prev, param) => {
        let value = primitive.params[param].value;

        if (param === 'result') {
          value = primitive.params[param];
        }

        prev.obj[param] = value;
        prev.list.push(`${param}="${value}"`);

        return prev;
      }, {obj: {}, list: []});

      if(isCode) {
        return `<${primitive.name}${divider}${params.list.join(divider)}/>`;
      }

      return (
        <primitive.name key={index} {...params.obj}/>
      );
    });
  }

  getCode() {
return `<filter id="filter">
\t${this.getPrimitives().join('\n\t')}
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
