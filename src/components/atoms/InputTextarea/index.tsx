import './InputTextarea.scss';

interface InputTextareaProps {
  secondValue: string | number;
  firstValue: string | number;
  value: string;
  className?: string;
  onChange: (value: string) => void;
};

const InputTextarea = ({secondValue, firstValue, value, className ='', onChange}: InputTextareaProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;

    if (secondValue) {
      value = `${value} ${secondValue}`;
    } else if (firstValue) {
      value = `${firstValue} ${value}`;
    }
    onChange(value);
  }

  return (<textarea
    value={value}
    onChange={onChangeHandler}
    spellCheck={false}
    className={`InputTextarea ${className}`}
  />)
}

export default InputTextarea;
