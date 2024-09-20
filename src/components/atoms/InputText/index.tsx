import React from 'react';
import './InputText.scss';

interface InputTextProps {
  secondValue: string | number;
  firstValue: string | number;
  value: string;
  type: 'text' | 'number';
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: string) => void;
};

const InputText = ({secondValue, firstValue, value, type, step, min, max, onChange}: InputTextProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target?.value;

    if (secondValue) {
      value = `${value} ${secondValue}`;
    } else if (firstValue) {
      value = `${firstValue} ${value}`;
    }
    onChange(value);
  }

  let size = value.length;
  if (size > 35) {
    size = 35;
  } else if (!size) {
    size = 1;
  }

  return <input
    value={value}
    type={type}
    step={step}
    size={size}
    min={min}
    max={max}
    onChange={onChangeHandler}
    className={`InputText InputText--${type}`}
    />
}

export default InputText;


