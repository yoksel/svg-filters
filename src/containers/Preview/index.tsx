import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection } from '../../store/types';
import { toggleEditPanel } from '../../store/previewSlice';
import Filter from '../Filter';
import PreviewTypeSwitcher from '../PreviewTypeSwitcher';
import SvgCodeContainer from '../SvgCode';
import getSvgContentByPreviewType from './getSvgContentByPreviewType';
import Tip from './Tip';

import './Preview.scss';

/** Component shows SVG content with applied filter */
const Preview = () => {
  const { section } = useSection();
  const previewType = useSelector((state: RootState) => state.preview.type);
  const customSvgCode = useSelector((state: RootState) => state.preview.customSvgCode);
  const dispatch = useDispatch();
  const primitives = useSelector((state: RootState) => {
    if (!isPrimitivesSection(section)) return [];
    return state.primitives.sections[section];
  });
  const filterId = primitives?.length ? 'filter' : '';
  const filterUrl = primitives?.length ? `url(#${filterId})` : '';

  const content = getSvgContentByPreviewType({ filterUrl, previewType, customSvgCode });

  return (
    <section className={`Preview Preview--${previewType}`}>
      <h2 className="visually-hidden">Live demo</h2>
      <div className="Preview__image">
        <PreviewTypeSwitcher />

        {previewType === 'edit' && <SvgCodeContainer />}

        <div className="Preview__svg-wrapper">
          <Tip
            noContent={!Boolean(content)}
            noFilter={!filterId && previewType === 'edit'}
            onClick={() => {
              dispatch(toggleEditPanel(true));
            }}
            section={section}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="Preview__svg"
          >
            <defs>
              <Filter />
            </defs>

            {content}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Preview;
