import React from 'react';
import './InputRadio.scss';

interface InputRadioProps {
  id: string,
  name: string,
  value: string,
  checked: boolean,
  hidden: boolean,
  onChange: (value: string) => void,
};

const InputRadio = ({value, checked, hidden, onChange}: InputRadioProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    onChange(value);
  }
  const classList = ['InputRadio'];

  if (hidden) {
    classList.push('visuallyhidden');
  }

  return <input
    value={value}
    type={'radio'}
    checked={checked}
    onChange={onChangeHandler}
    className={classList.join(' ')}
  />;
}

export default InputRadio;


