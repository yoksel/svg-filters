import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaygroundType } from '../../store/playgroundSlice';

import RadioList from '../../components/molecules/RadioList';

const typesList = [
  {
    id: 'image-and-text',
    name: 'Image and Text',
  },
  {
    id: 'image',
    name: 'Image',
  },
  {
    id: 'text',
    name: 'Text',
  },
  {
    id: 'edit',
    name: 'Your Code',
  },
];

const PlaygroundSwitcher = () => {
  const playgroundType = useSelector((state: RootState) => state.playground.type);
  const dispatch = useDispatch();

  return (
    <div className="PlaygroundSwitcher">
      <RadioList
        list={typesList}
        current={playgroundType || 'image-and-text'}
        name="playgroundType"
        onChange={(type) => {
          dispatch(setPlaygroundType(type));
        }}
      />
    </div>
  );
};

export default PlaygroundSwitcher;
