import { Section } from '../types';
import primitivesReducers from './primitivesReducers';
import primitivesAttrs from '../../data/primitivesAttrs';

// because Node.js does not support structuredClone()
global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

// ADD_PRIMITIVE
// ------------------------------

const blendMock = {
  id: 'blend',
  groupName: 'blend' as keyof typeof primitivesAttrs,
  params: {
    mode: {
      value: 'multiply',
    },
    x: {
      value: '0%',
    },
    y: {
      value: '0%',
    },
    width: {
      value: '100%',
    },
    height: {
      value: '100%',
    },
    in: {
      value: 'SourceGraphic',
    },
    in2: {
      value: 'SourceGraphic',
    },
    result: {
      value: 'blend',
    },
  },
};

const blurMock = {
  id: 'blur',
  groupName: 'blur' as keyof typeof primitivesAttrs,
  params: {
    stdDeviation: {
      value: '3 10',
    },
    x: {
      value: '0%',
    },
    y: {
      value: '0%',
    },
    width: {
      value: '100%',
    },
    height: {
      value: '100%',
    },
    in: {
      value: 'SourceGraphic',
    },
    edgeMode: {
      value: 'none',
    },
    result: {
      value: 'blur',
    },
  },
};

describe('reducers', () => {
  it('addPrimitive: should add primitive to state', () => {
    const stateBefore = {
      playground: [],
    };
    const action = {
      type: 'ADD_PRIMITIVE',
      section: 'playground' as Section,
      item: blurMock,
      nativeEvent: {
        offsetX: 108,
        offsetY: 12,
      },
    };
    const stateAfter = {
      playground: [
        {
          ...blurMock,
          justAdded: true,
          children: undefined,
          disabled: false,
          nativeEvent: {
            offsetX: 108,
            offsetY: 12,
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.addPrimitive(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // DISCOVERY_PRIMITIVE
  // ------------------------------

  it('discoverPrimitive: should add primitive to state and replace existed', () => {
    const stateBefore = {
      playground: [],
      docs: [blurMock],
    };
    const action = {
      type: 'DISCOVERY_PRIMITIVE',
      primitives: [blendMock],
    };
    const stateAfter = {
      playground: [],
      docs: [blendMock],
    };

    // @ts-expect-error
    primitivesReducers.discoverPrimitive(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // DUPLICATE_PRIMITIVE
  // ------------------------------

  it('duplicatePrimitive: should duplicate primitive in state', () => {
    const stateBefore = {
      playground: [blurMock],
    };
    const action = {
      type: 'DUPLICATE_PRIMITIVE',
      id: 'blur',
      item: blurMock,
      section: 'playground',
    };
    const stateAfter = {
      playground: [
        blurMock,
        {
          ...blurMock,
          id: 'blur1',
          params: {
            ...blurMock.params,
            result: {
              value: 'blur1',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.duplicatePrimitive(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // TOGGLE_PRIMITIVE
  // ------------------------------

  it('togglePrimitive: should toggle primitive status', () => {
    const stateBefore = {
      playground: [blurMock],
    };
    const action = {
      type: 'TOGGLE_PRIMITIVE',
      section: 'playground',
      id: 'blur',
      disabled: true,
    };
    const stateAfter = {
      playground: [
        {
          ...blurMock,
          disabled: true,
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.togglePrimitive(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  it('togglePrimitive: should toggle child primitive status', () => {
    const mergeNode = {
      id: 'mergeNode',
      groupName: 'mergeNode',
      params: {
        in: {
          value: 'SourceGraphic',
        },
        result: {
          value: 'mergeNode',
        },
      },
    };

    const stateBefore = {
      playground: [
        {
          id: 'merge',
          groupName: 'merge',
          params: {
            result: {
              value: 'merge',
            },
          },
          children: [mergeNode],
        },
      ],
    };
    const action = {
      type: 'TOGGLE_PRIMITIVE',
      section: 'playground',
      id: 'merge',
      childId: 'mergeNode',
      disabled: true,
    };
    const stateAfter = {
      playground: [
        {
          id: 'merge',
          groupName: 'merge',
          params: {
            result: {
              value: 'merge',
            },
          },
          children: [
            {
              ...mergeNode,
              disabled: true,
            },
          ],
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.togglePrimitive(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // DELETE_PRIMITIVE
  // ------------------------------

  it('deletePrimitive: should delete primitive from state by ID', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            stdDeviation: {
              value: 4,
            },
            result: {
              value: 'blur',
            },
          },
        },
        {
          id: 'blur1',
          groupName: 'blur',
          params: {
            stdDeviation: {
              value: 4,
            },
            result: {
              value: 'blur1',
            },
          },
        },
      ],
    };
    const action = {
      type: 'DELETE_PRIMITIVE',
      section: 'playground',
      id: 'blur1',
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            stdDeviation: {
              value: 4,
            },
            result: {
              value: 'blur',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.deletePrimitive(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // TOGGLE_PROP
  // ------------------------------

  it('togglePrimitiveProp: should toggle primitive param', () => {
    const stateBefore = {
      playground: [blurMock],
    };
    const action = {
      section: 'playground',
      id: 'blur',
      param: 'width',
      value: '100%',
      disabled: true,
    };
    const stateAfter = {
      playground: [
        {
          ...blurMock,
          params: {
            ...blurMock.params,
            width: {
              value: '100%',
              disabled: true,
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.togglePrimitiveProp(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // CHANGE_PRIMITIVE_PROP
  // ------------------------------

  it('changePrimitiveProp: should change primitive param value', () => {
    const stateBefore = {
      playground: [blurMock],
    };
    const action = {
      type: 'CHANGE_PRIMITIVE_PROP',
      section: 'playground',
      id: 'blur',
      param: 'width',
      value: '60%',
    };
    const stateAfter = {
      playground: [
        {
          ...blurMock,
          params: {
            ...blurMock.params,
            width: {
              value: '60%',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.changePrimitiveProp(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // CHANGE_PROP_TYPE
  // ------------------------------

  it('changePrimitivePropType: should change primitive param type', () => {
    const stateBefore = {
      playground: [blurMock],
    };
    const action = {
      type: 'CHANGE_PROP_TYPE',
      section: 'playground',
      id: 'blur',
      param: 'in',
      value: 'SourceGraphic',
      propType: 'select',
    };
    const stateAfter = {
      playground: [
        {
          ...blurMock,
          params: {
            ...blurMock.params,
            in: {
              value: 'SourceGraphic',
              type: 'select',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.changePrimitivePropType(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // UPDATE_INS
  // ------------------------------

  it('0️⃣  changeInProps: should update attributes `in`', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          disabled: true,
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
        {
          id: 'matrix',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };
    const action = {
      type: 'UPDATE_INS',
      section: 'playground',
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          disabled: true,
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'SourceGraphic',
              prevValue: 'blur',
            },
          },
        },
        {
          id: 'matrix',
          params: {
            in: {
              value: 'blend',
              prevValue: 'blur',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.changeInProps(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  it('1️⃣  changeInProps: should keep previous attribute `in`', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          disabled: true,
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
        {
          id: 'matrix',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };
    const action = {
      type: 'UPDATE_INS',
      section: 'playground',
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          disabled: true,
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'SourceGraphic',
              prevValue: 'blur',
            },
          },
        },
        {
          id: 'matrix',
          params: {
            in: {
              value: 'blend',
              prevValue: 'blur',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.changeInProps(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  it('2️⃣  changeInProps: should place previous attribute `in` if it available again', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'SourceGraphic',
              prevValue: 'blur',
            },
          },
        },
        {
          id: 'matrix',
          params: {
            in: {
              value: 'blend',
              prevValue: 'blur',
            },
          },
        },
      ],
    };
    const action = {
      type: 'UPDATE_INS',
      section: 'playground',
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
        {
          id: 'matrix',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.changeInProps(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // SWITCH_OFF_LAST_ADDED
  // ------------------------------

  it('switchOffLastAdded: should switch off prop by primitive id', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
          justAdded: true,
          nativeEvent: { offsetX: 113, offsetY: 18 },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };
    const action = {
      id: 'blur',
      section: 'playground',
      type: 'SWITCH_OFF_LAST_ADDED',
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
          justAdded: false,
          nativeEvent: null,
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.switchOffLastAdded(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // SWAP_PRIMITIVES
  // ------------------------------

  it('swapPrimitives: should swap primitives', () => {
    const stateBefore = {
      playground: [blurMock, blendMock],
    };
    const action = {
      indexes: { from: 0, to: 1 },
      section: 'playground',
      swapSnapshot: 'blur-0,blend-1',
      type: 'SWAP_PRIMITIVES',
    };
    const stateAfter = {
      playground: [blendMock, blurMock],
      swapSnapshot: 'blur-0,blend-1',
    };

    // @ts-expect-error
    primitivesReducers.swapPrimitives(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // PURGE_PRIMITIVES
  // ------------------------------

  it('purgePrimitives: should purge given list', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };
    const action = {
      section: 'playground',
      type: 'PURGE_PRIMITIVES',
    };
    const stateAfter = {
      playground: [],
    };

    // @ts-expect-error
    primitivesReducers.purgePrimitives(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // SWITCH_CHILD
  // ------------------------------

  it('switchChild: should enable one child & disable others', () => {
    const stateBefore = {
      playground: [
        {
          id: 'diffuseLighting',
          children: [
            {
              id: 'distantLight',
              disabled: false,
            },
            {
              id: 'pointLight',
              disabled: true,
            },
            {
              id: 'spotLight',
              disabled: true,
            },
          ],
        },
      ],
    };
    const action = {
      id: 'pointLight',
      parentId: 'diffuseLighting',
      section: 'playground',
      type: 'SWITCH_CHILD',
    };
    const stateAfter = {
      playground: [
        {
          id: 'diffuseLighting',
          children: [
            {
              id: 'distantLight',
              disabled: true,
            },
            {
              id: 'pointLight',
              disabled: false,
            },
            {
              id: 'spotLight',
              disabled: true,
            },
          ],
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.switchChild(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // MOVE_TO_PLAYGROUND
  // ------------------------------

  it('moveToPlayground: should move given section items to playground', () => {
    const stateBefore = {
      presets: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
      playground: [],
    };
    const action = {
      section: 'presets',
      type: 'MOVE_TO_PLAYGROUND',
    };
    const stateAfter = {
      presets: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.moveToPlayground(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // TOGGLE_DOCS
  // ------------------------------

  it('0️⃣ toggleDocs: should toggle docs for given item', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };
    const action = {
      section: 'playground',
      id: 'blur',
      type: 'TOGGLE_DOCS',
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
          showDocs: true,
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.toggleDocs(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  it('1️⃣ toggleDocs: should toggle docs for given child', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
          children: [
            {
              id: 'mergeNode',
            },
            {
              id: 'mergeNode1',
            },
          ],
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };
    const action = {
      section: 'playground',
      id: 'blur',
      childId: 'mergeNode1',
      type: 'TOGGLE_DOCS',
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              value: 'SourceGraphic',
            },
          },
          children: [
            {
              id: 'mergeNode',
            },
            {
              id: 'mergeNode1',
              showDocs: true,
            },
          ],
        },
        {
          id: 'blend',
          params: {
            in: {
              value: 'blur',
            },
          },
        },
      ],
    };

    // @ts-expect-error
    primitivesReducers.toggleDocs(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });

  // TODO: CHECK THIS REDUCER
  it('addPreset: should add preset primitives to page', () => {
    const stateBefore = {
      playground: [],
    };
    const action = {
      primitives: [blurMock, blendMock],
      colorInterpolationFilters: 'linearRGB',
    };
    const stateAfter = {
      playground: [],
      presets: [blurMock, blendMock],
      filter: { colorInterpolationFilters: 'linearRGB' },
    };

    // @ts-expect-error
    primitivesReducers.addPreset(stateBefore, { payload: action });
    expect(stateBefore).toEqual(stateAfter);
  });
});
