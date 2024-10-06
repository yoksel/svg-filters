import React from 'react';
import './InputRadio.scss';
import clsx from 'clsx';

interface InputRadioProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  hidden: boolean;
  onChange: (value: string) => void;
}

const InputRadio = ({ value, checked, hidden, onChange }: InputRadioProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    onChange(value);
  };

  return (
    <input
      value={value}
      type={'radio'}
      checked={checked}
      onChange={onChangeHandler}
      className={clsx('InputRadio', hidden && 'visuallyhidden')}
    />
  );
};

export default InputRadio;


