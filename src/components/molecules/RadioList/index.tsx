import InputRadio from '../../atoms/InputRadio';

import './RadioList.scss';

interface RadioListProps {
  current: string;
  list: {id: string, name: string}[];
  name: string;
  onChange: (value: string) => void
};

const RadioList = ({list, current, name, onChange}: RadioListProps) => {
    return (
      <div className="RadioList">
        {name && <b className="RadioList__name">{name}:</b>}

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

export default RadioList;

