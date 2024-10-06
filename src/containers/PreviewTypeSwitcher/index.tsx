import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { setPreviewType } from '../../store/previewSlice';

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

const PreviewTypeSwitcher = () => {
  const playgroundType = useSelector((state: RootState) => state.preview.type);
  const dispatch = useDispatch();

  return (
    <div className="PreviewTypeSwitcher">
      <RadioList
        list={typesList}
        current={playgroundType || 'image-and-text'}
        onChange={(type) => {
          dispatch(setPreviewType(type));
        }}
      />
    </div>
  );
};

export default PreviewTypeSwitcher;
