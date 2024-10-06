import { useDispatch, useSelector } from 'react-redux';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

// import { addPreset, discoveryPrimitive, purgePrimitives } from '../../store/actions';
import {
  addPresetPrimitivesToStage,
  addPrimitive,
  discoverPrimitive,
  purgePrimitives,
} from '../../store/primitivesSlice';

import App from '../../components/App';
import { RootState } from '../../store';
import { isPrimitiveItems, Preset, PrimitiveItem } from '../../store/types';

export function loader({ params }: LoaderFunctionArgs<{ params: string }>) {
  return params;
}

const AppRoute = (props: any) => {
  console.log('=== AppRoute ===');
  const { section, id } = (useLoaderData() as { section: string; id?: string }) || {};
  const presets = useSelector((state: RootState) => state.data.presets);
  const primitives = useSelector((state: RootState) => state.data.primitives);
  const docs = useSelector((state: RootState) => state.data.docs);
  const dispatch = useDispatch();

  // @ts-expect-error
  const purgePrev = (prevSection) => {
    if (!prevSection) {
      return null;
    }
    // @ts-expect-error
    this.props.purgePrimitives(prevSection);
  };

  const itemFromPath = () => {
    console.log('\n\nitemFromPath\n\n', id);
    const currentSet = section === 'docs' ? primitives : presets;
    let currentItems: (PrimitiveItem | Preset)[] = [];

    if (!id) {
      return null;
    }

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
    } else if (Array.isArray(currentSet)) {
      console.log('SECTION: OTHER');
      console.log({ currentSet });
      console.log({ t: typeof currentSet });
      console.log({ arr: Array.isArray(currentSet) });
      console.log({ id });
      // @ts-expect-error
      currentItems = currentSet?.filter?.((item) => item.id === id);
    }

    if (section === 'docs' && id && isPrimitiveItems(currentItems)) {
      dispatch(discoverPrimitive({ primitives: currentItems }));
    }

    console.log('1 currentItems', currentItems);
    if (currentItems.length && section === 'presets' && id) {
      const preset = presets.find((preset: Preset) => preset.id === id);
      if (preset?.primitives?.length)
        dispatch(addPresetPrimitivesToStage({ primitives: preset?.primitives }));
    }
  };

  itemFromPath();

  return <App />;
};

export default AppRoute;
