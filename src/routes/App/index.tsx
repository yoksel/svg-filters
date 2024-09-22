import React, { Component } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import withRouter from '../../helpers/withRouter';
import { LoaderFunctionArgs, useLoaderData, useMatch, useParams } from 'react-router-dom';

// import { addPreset, discoveryPrimitive, purgePrimitives } from '../../store/actions';
import { addPrimitive, discoverPrimitive, purgePrimitives } from '../../store/primitivesSlice';

import { docsData } from '../../data';

import App from '../../components/App';
import { RootState } from '../../store';
import { PrimitiveItem } from '../../components/molecules/Primitive';

export function loader({ params }: LoaderFunctionArgs<{ params: string }>) {
  return params;
}

const AppRoute = (props: any) => {
  console.log('=== AppRoute ===');
  const { section, id } = (useLoaderData() as { section: string; id?: string }) || {};
  const presets = useSelector((state: RootState) => state.presetControls);
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
    let currentItems = [];

    if (!id) {
      return null;
    }

    // console.log({ dataFromStore, currentSet, id });
    // console.log({ dataById: docsData[id] });
    // console.log({ dataFromStore, section });

    if (section === 'docs') {
      // @ts-expect-error
      if (docsData[id] && docsData[id].primitives) {
        console.log(1);
        //   // Doc contains set of primitives for demo
        //   // @ts-expect-error
        //   currentItems = docsData[id].primitives;
      } else {
        console.log(2);
        //   // No presets, take from primitiveControls
        //   // @ts-expect-error
        // currentItems = currentSet?.primitives.filter((item: PrimitiveItem) => item.id === id);
      }
    } else {
      // console.log(currentSet.primitives);
      // currentItems = currentSet.primitives?.filter((item) => item.id === id);
    }

    if (section === 'docs' && id) {
      console.log('discoveryPrimitive in ROUTE');
      // dispatch(discoverPrimitive(primitives));
    }

    // console.log('currentItems', currentItems);
    if (currentItems.length) {
      // if (section === 'presets' && id) {
      //   // handlerName = 'addPreset';
      // } else if (section === 'docs' && id) {
      //   console.log('discoveryPrimitive');
      //   dispatch(discoverPrimitive(primitives));
      // }
      // if (section === 'presets' && id) {
      //   handlerName = 'addPreset';
      // }
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
      // handler(currentItems);
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

  return <div>123</div>;
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
// App = withRouter(connect(
//   mapStateToProps,
//   // mapDispatchProps
// )(App));

export default AppRoute;
