import React from 'react';
import './InputRadio.scss';
import clsx from 'clsx';

export interface InputRadioProps {
  id: string;
  name: string;
  value?: string;
  checked?: boolean;
  hidden?: boolean;
  onChange: (value: string) => void;
}

const InputRadio = ({ id, name, value, checked, hidden, onChange }: InputRadioProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    onChange(value);
  };

  return (
    <input
      id={id}
      value={value}
      type="radio"
      name={name}
      checked={checked}
      onChange={onChangeHandler}
      className={clsx('InputRadio', hidden && 'visually-hidden')}
    />
  );
};

export default InputRadio;


