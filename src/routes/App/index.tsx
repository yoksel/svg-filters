import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import withRouter from '../../helpers/withRouter';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';

import { addPreset, discoveryPrimitive, purgePrimitives } from '../../store/actions';

import { docsData } from '../../data';

import AppTemplate from '../../components/App';
import { RootState } from '../../store';

export function loader({ params }: LoaderFunctionArgs<{ params: string }>) {
  return params;
}

const App = (props: any) => {
  console.log('=== APP ===');
  const params = useLoaderData() as { section: string };
  const section = params?.section;
  const presetControls = useSelector((state: RootState) => state.presetControls);
  // const primitiveControls = useSelector((state: RootState) => state.primitive.type);

  // return <ColorInterpolFiltersSwitcher />;

  // @ts-expect-error
  const purgePrev = (prevSection) => {
    if (!prevSection) {
      return null;
    }
    // @ts-expect-error
    this.props.purgePrimitives(prevSection);
  };

  const itemFromPath = () => {
    // @ts-expect-error
    const { id, section, handlerName } = this.props;
    // @ts-expect-error
    const currentSet = this?.props?.[section];
    // @ts-expect-error
    const handler = this.props[handlerName];
    let currentItems = [];

    if (!id) {
      return null;
    }

    if (section === 'docs') {
      // @ts-expect-error
      if (docsData[id] && docsData[id].primitives) {
        // Doc contains set of primitives for demo
        // @ts-expect-error
        currentItems = docsData[id].primitives;
      } else {
        // No presets, take from primitiveControls
        // @ts-expect-error
        currentItems = currentSet.filter((item) => item.id === id);
      }
    } else {
      // @ts-expect-error
      currentItems = currentSet.filter((item) => item.id === id);
    }

    if (currentItems) {
      handler(currentItems);
    }
  };

  // componentDidMount() {
  //   this.itemFromPath();
  // }

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

  return <AppTemplate section={section} />;
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

export default App;
