import { Interpolation } from '../../../store/types';
import InputRadio from '../../atoms/InputRadio';

import './RadioList.scss';

interface RadioListProps {
  current: string;
  list: { id: string; name: string }[];
  listTitle?: string;
  onChange: (value: string | Interpolation) => void;
}
/** Component allows to switch given values using radio buttons */
const RadioList = ({ list, current, listTitle, onChange }: RadioListProps) => {
  return (
    <div className="RadioList">
      {listTitle && <b className="RadioList__name">{listTitle}:</b>}

      {list.map((type) => {
        return (
          <label className="RadioList__label" key={type.id}>
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
};

export default RadioList;
