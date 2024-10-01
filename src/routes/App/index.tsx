import { useDispatch, useSelector } from 'react-redux';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

// import { addPreset, discoveryPrimitive, purgePrimitives } from '../../store/actions';
import {
  addPreset,
  addPrimitive,
  discoverPrimitive,
  purgePrimitives,
} from '../../store/primitivesSlice';

import { docsData } from '../../data/';

import App from '../../components/App';
import { RootState } from '../../store';
import { isPrimitiveItem, Preset, PrimitiveItem } from '../../store/types';

export function loader({ params }: LoaderFunctionArgs<{ params: string }>) {
  return params;
}

const AppRoute = (props: any) => {
  console.log('=== AppRoute ===');
  const { section, id } = (useLoaderData() as { section: string; id?: string }) || {};
  const presets = useSelector((state: RootState) => state.presetControls.presets);
  const primitives = useSelector((state: RootState) => state.primitives);
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
    console.log('itemFromPath', id);
    const currentSet = section === 'docs' ? primitives : presets;
    let currentItems: (PrimitiveItem | Preset)[] = [];

    if (!id) {
      return null;
    }

    // console.log({ dataFromStore, currentSet, id });
    // console.log({ dataById: docsData[id] });
    // console.log({ dataFromStore, section });

    if (section === 'docs' && docsData[id]) {
      // only tiles docs has primitives for demo
      if (docsData[id].primitives) {
        // to fix
        currentItems = docsData[id].primitives as PrimitiveItem[];
      } else {
        const primitiveById = primitives?.primitives?.find((primitive) => id === primitive.id);
        // No presets, take from primitiveControls
        if (primitiveById) currentItems = [primitiveById];
      }
    } else if (Array.isArray(currentSet)) {
      console.log('SECTION: OTHER');
      console.log({ currentSet });
      console.log({ t: typeof currentSet });
      console.log({ arr: Array.isArray(currentSet) });
      console.log({ id });
      currentItems = currentSet?.filter?.((item) => item.id === id);
    }

    if (section === 'docs' && id && isPrimitiveItem(currentItems[0])) {
      console.log('discoveryPrimitive in ROUTE');
      // @ts-expect-error
      dispatch(discoverPrimitive({ primitives: currentItems }));
    }

    console.log('1 currentItems', currentItems);
    if (currentItems.length) {
      console.log('2 has items', currentItems);
      if (section === 'presets' && id) {
        console.log('3 has id in presets', id);
        const preset = presets.find((preset: Preset) => preset.id === id);
        console.log(preset?.primitives);
        if (preset?.primitives?.length) dispatch(addPreset({ primitives: preset?.primitives }));
      }

      // return {
      //     addPreset: (presets) => {
      //       dispatch(addPreset(presets[0]));
      //     },
      //     discoveryPrimitive: (primitives) => {
      //       dispatch(discoveryPrimitive({primitives}));
      //     },
      //     purgePrimitives: (section) => {
      //       dispatch(purgePrimitives({section}));
      //     }
      //   };
    }
  };

  itemFromPath();

  // componentDidUpdate(prevProps) {
  //   // @ts-expect-error
  //   const { id, section } = this.props;

  //   if (prevProps.id !== id) {
  //     this.itemFromPath();
  //   }
  //   if (prevProps.section !== section) {
  //     this.purgePrev(prevProps.section);
  //   }
  // }

  // return <div>123</div>;
  return <App />;
};

// @ts-expect-error
const mapStateToProps = (state, { match }) => {
  const { presetControls, primitiveControls } = state;
  const { section, id } = match?.params || {};
  let handlerName;

  if (!section) return null;

  if (section === 'presets' && id) {
    handlerName = 'addPreset';
  } else if (section === 'docs' && id) {
    handlerName = 'discoveryPrimitive';
  }

  return {
    id,
    section,
    handlerName,
    docs: primitiveControls,
    presets: presetControls,
  };
};

// const mapDispatchProps = (dispatch, props) => {
//   return {
//     addPreset: (presets) => {
//       dispatch(addPreset(presets[0]));
//     },
//     discoveryPrimitive: (primitives) => {
//       dispatch(discoveryPrimitive({primitives}));
//     },
//     purgePrimitives: (section) => {
//       dispatch(purgePrimitives({section}));
//     }
//   };
// };

export default AppRoute;
