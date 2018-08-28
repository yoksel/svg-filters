import React, {Component} from 'react';
import './InputRadio.css';
import PropTypes from 'prop-types';

class InputRadio extends Component {
  onChange = (event) => {
    let value = event.target.value;

    this.props.onChange(value);
  }

  render() {
    let {value, checked, hidden} = this.props;

    const classList = ['InputRadio'];

    if (hidden) {
      classList.push('visuallyhidden');
    }

    return React.createElement('input', {
      value: value,
      type: 'radio',
      checked: checked,
      onChange: this.onChange,
      className: classList.join(' ')
    });
  }
}

export default InputRadio;

InputRadio.propTypes = {
  id: PropTypes.string,
  parentId: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  hidden: PropTypes.bool,
  onChange: PropTypes.func,
};
