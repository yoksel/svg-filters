import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InputRadio from '../InputRadio';

import './RadioList.css';

class RadioList extends Component {
  render() {
    const {list, current, onChange} = this.props;

    return (
      <div className="RadioList">
        {list.map((type) => {
          return (
            <label
              className="RadioList__label"
              key={type.id}
            >
              <InputRadio
                id={type.id}
                name="RadioList__radio"
                checked={type.id === current}
                value={type.id}
                hidden={true}
                onChange={onChange}
              />

              <span className="RadioList__label-text">{type.name}</span>
            </label>
          );
        })}
      </div>
    );
  }
}

export default RadioList;

RadioList.propTypes = {
  list: PropTypes.array,
  current: PropTypes.string,
  onChange: PropTypes.func
};
