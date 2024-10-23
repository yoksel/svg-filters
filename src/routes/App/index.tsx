import { useDispatch, useSelector } from 'react-redux';
import { LoaderFunctionArgs } from 'react-router-dom';

import {
  addPresetPrimitivesToStage,
  discoverPrimitive,
  purgeAllPrimitivesExcludingSection,
} from '../../store/primitivesSlice';

import App from '../../containers/App';
import { RootState } from '../../store/store';
import { isPrimitiveItems, isPrimitivesSection, Preset, PrimitiveItem } from '../../store/types';
import useSection from '../../hooks/useSection';

export function loader({ params }: LoaderFunctionArgs<{ params: string }>) {
  return params;
}

/** App container fills page with content by id from url. */
const AppRoute = () => {
  const { section, id } = useSection();
  const presets = useSelector((state: RootState) => state.data.presets);
  const primitives = useSelector((state: RootState) => state.data.primitives);
  const docs = useSelector((state: RootState) => state.data.docs);
  const dispatch = useDispatch();

  const itemFromPath = () => {
    if (!id) {
      return null;
    }

    const currentSet = section === 'docs' ? primitives : presets;
    let currentItems: (PrimitiveItem | Preset)[] = [];

    if (section === 'docs' && docs[id]) {
      // only Tiles docs has primitives for demo
      if (docs[id].primitives) {
        // to fix
        currentItems = docs[id].primitives as PrimitiveItem[];
      } else {
        const primitivesById = primitives?.filter((primitive) => id === primitive.id);
        // No presets, take from primitiveControls
        if (primitivesById?.length) currentItems = primitivesById;
      }
    } else if (Boolean(currentSet.length)) {
      // @ts-expect-error
      currentItems = currentSet?.filter?.((item: { id: string }) => item.id === id);
    }

    if (section === 'docs' && id && isPrimitiveItems(currentItems)) {
      dispatch(discoverPrimitive({ primitives: currentItems }));
    }

    if (currentItems.length && section === 'presets' && id) {
      const preset = presets.find((preset: Preset) => preset.id === id);
      if (preset?.primitives?.length) {
        dispatch(
          addPresetPrimitivesToStage({
            primitives: preset?.primitives,
            colorInterpolationFilters: preset?.colorInterpolationFilters,
          }),
        );
      }
    }
  };

  itemFromPath();

  if (isPrimitivesSection(section)) {
    dispatch(purgeAllPrimitivesExcludingSection({ section }));
  }

  return <App />;
};

export default AppRoute;
