import React from 'react';

import './InputSelect.scss';

interface InputSelectProps {
  secondValue: string;
  firstValue?: string;
  value: string;
  valuesList: string[];
  onChange: (value: string) => void;
}

const InputSelect = ({
  value,
  valuesList,
  secondValue,
  firstValue,
  onChange,
}: InputSelectProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;

    if (secondValue) {
      value = `${value} ${secondValue}`;
    } else if (firstValue) {
      value = `${firstValue} ${value}`;
    }

    onChange(value);
  };

  return (
    <select onChange={onChangeHandler} value={value} className="InputSelect">
      {valuesList?.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
