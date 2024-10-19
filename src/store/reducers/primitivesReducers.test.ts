import reducer, {
  addPrimitive,
  discoverPrimitive,
  duplicatePrimitive,
  getInitialState,
  togglePrimitive,
  deletePrimitive,
  togglePrimitiveProp,
  changePrimitiveProp,
  changePrimitivePropType,
  changeInProps,
  switchOffLastAdded,
  swapPrimitives,
  purgePrimitives,
  switchChild,
  moveToPlayground,
  toggleDocs,
  addPresetPrimitivesToStage,
} from '../primitivesSlice';
import { Interpolation, PrimitivesSections, PrimitivesState } from '../types';
import {
  blendMock,
  blurMock,
  diffuseLighting,
  distantLightMock,
  matrixMock,
  mergeMock,
  mergeNodeMock,
  pointLightMock,
  spotLightMock,
} from './mocks';

const mockState = (overrides?: Partial<PrimitivesState>): PrimitivesState => {
  return {
    ...getInitialState(),
    ...overrides,
  };
};

describe('reducers', () => {
  // ADD_PRIMITIVE
  // ------------------------------

  it('addPrimitive: should add primitive to state', () => {
    const stateBefore = mockState();

    const action = {
      type: 'ADD_PRIMITIVE',
      section: 'playground' as keyof PrimitivesSections,
      primitive: blurMock,
      nativeEvent: {
        offsetX: 108,
        offsetY: 12,
      },
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            justAdded: true,
            nativeEvent: {
              offsetX: 108,
              offsetY: 12,
            },
          },
        ],
      },
    });

    expect(reducer(stateBefore, addPrimitive(action))).toEqual(stateAfter);
  });

  // DISCOVERY_PRIMITIVE
  // ------------------------------

  it('discoverPrimitive: should add primitive to state and replace existed', () => {
    const stateBefore = mockState({
      sections: {
        playground: [],
        docs: [blurMock],
      },
    });
    const action = {
      type: 'DISCOVERY_PRIMITIVE',
      primitives: [blendMock],
    };
    const stateAfter = mockState({
      sections: {
        playground: [],
        docs: [blendMock],
      },
    });

    expect(reducer(stateBefore, discoverPrimitive(action))).toEqual(stateAfter);
  });

  // DUPLICATE_PRIMITIVE
  // ------------------------------

  it('duplicatePrimitive: should duplicate primitive in state', () => {
    const stateBefore = mockState({
      sections: {
        playground: [blurMock],
      },
    });
    const action = {
      type: 'DUPLICATE_PRIMITIVE',
      ...blurMock,
      primitive: blurMock,
      section: 'playground' as keyof PrimitivesSections,
    };
    const stateAfter = mockState({
      sections: {
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
            showDocs: false,
          },
        ],
      },
    });

    expect(reducer(stateBefore, duplicatePrimitive(action))).toEqual(stateAfter);
  });

  // TOGGLE_PRIMITIVE
  // ------------------------------

  it('togglePrimitive: should toggle primitive status', () => {
    const stateBefore = mockState({
      sections: {
        playground: [blurMock],
      },
    });
    const action = {
      type: 'TOGGLE_PRIMITIVE',
      section: 'playground' as keyof PrimitivesSections,
      ...blurMock,
      disabled: true,
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            disabled: true,
          },
        ],
      },
    });

    expect(reducer(stateBefore, togglePrimitive(action))).toEqual(stateAfter);
  });

  it('togglePrimitive: should toggle child primitive status', () => {
    const stateBefore = mockState({
      sections: {
        playground: [{ ...mergeMock, children: [{ ...mergeNodeMock }] }],
      },
    });
    const action = {
      type: 'TOGGLE_PRIMITIVE',
      section: 'playground' as keyof PrimitivesSections,
      id: 'merge',
      childId: 'mergeNode',
      disabled: true,
    };
    const stateAfter = mockState({
      sections: {
        playground: [{ ...mergeMock, children: [{ ...mergeNodeMock, disabled: true }] }],
      },
    });

    expect(reducer(stateBefore, togglePrimitive(action))).toEqual(stateAfter);
  });

  // DELETE_PRIMITIVE
  // ------------------------------

  it('deletePrimitive: should delete primitive from state by ID', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
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
      },
    });
    const action = {
      type: 'DELETE_PRIMITIVE',
      section: 'playground' as keyof PrimitivesSections,
      id: 'blur1',
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
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
      },
    });

    expect(reducer(stateBefore, deletePrimitive(action))).toEqual(stateAfter);
  });

  // TOGGLE_PROP
  // ------------------------------

  it('togglePrimitiveProp: should toggle primitive param', () => {
    const stateBefore = mockState({
      sections: {
        playground: [blurMock],
      },
    });
    const action = {
      section: 'playground' as keyof PrimitivesSections,
      ...blurMock,
      param: 'width',
      value: '100%',
      disabled: true,
    };
    const stateAfter = mockState({
      sections: {
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
      },
    });

    expect(reducer(stateBefore, togglePrimitiveProp(action))).toEqual(stateAfter);
  });

  // CHANGE_PRIMITIVE_PROP
  // ------------------------------

  it('changePrimitiveProp: should change primitive param value', () => {
    const stateBefore = mockState({
      sections: {
        playground: [blurMock],
      },
    });
    const action = {
      type: 'CHANGE_PRIMITIVE_PROP',
      section: 'playground' as keyof PrimitivesSections,
      ...blurMock,
      param: 'width',
      value: '60%',
    };
    const stateAfter = mockState({
      sections: {
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
      },
    });

    expect(reducer(stateBefore, changePrimitiveProp(action))).toEqual(stateAfter);
  });

  // CHANGE_PROP_TYPE
  // ------------------------------

  it('changePrimitivePropType: should change primitive param type', () => {
    const stateBefore = mockState({
      sections: {
        playground: [blurMock],
      },
    });
    const action = {
      type: 'CHANGE_PROP_TYPE',
      section: 'playground' as keyof PrimitivesSections,
      ...blurMock,
      param: 'in',
      value: 'SourceGraphic',
      propType: 'select',
    };
    const stateAfter = mockState({
      sections: {
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
      },
    });

    expect(reducer(stateBefore, changePrimitivePropType(action))).toEqual(stateAfter);
  });

  // UPDATE_INS
  // ------------------------------

  it('0️⃣  changeInProps: should update attributes `in` if first one is disabled', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            disabled: true,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
          {
            ...matrixMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
      },
    });
    const action = {
      type: 'UPDATE_INS',
      section: 'playground' as keyof PrimitivesSections,
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            disabled: true,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'SourceGraphic',
                prevValue: 'blur',
              },
            },
          },
          {
            ...matrixMock,
            params: {
              in: {
                value: 'blend',
                prevValue: 'blur',
              },
            },
          },
        ],
      },
    });

    expect(reducer(stateBefore, changeInProps(action))).toEqual(stateAfter);
  });

  it('1️⃣  changeInProps: should keep previous attribute `in`', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            disabled: true,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
          {
            ...matrixMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
      },
    });
    const action = {
      type: 'UPDATE_INS',
      section: 'playground' as keyof PrimitivesSections,
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            disabled: true,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'SourceGraphic',
                prevValue: 'blur',
              },
            },
          },
          {
            ...matrixMock,
            params: {
              in: {
                value: 'blend',
                prevValue: 'blur',
              },
            },
          },
        ],
      },
    });

    expect(reducer(stateBefore, changeInProps(action))).toEqual(stateAfter);
  });

  it('2️⃣  changeInProps: should place previous attribute `in` if it available again', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'SourceGraphic',
                prevValue: 'blur',
              },
            },
          },
          {
            ...matrixMock,
            params: {
              in: {
                value: 'blend',
                prevValue: 'blur',
              },
            },
          },
        ],
      },
    });
    const action = {
      type: 'UPDATE_INS',
      section: 'playground' as keyof PrimitivesSections,
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
          {
            ...matrixMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
      },
    });

    expect(reducer(stateBefore, changeInProps(action))).toEqual(stateAfter);
  });

  // SWITCH_OFF_LAST_ADDED
  // ------------------------------

  it('switchOffLastAdded: should switch off prop by primitive id', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
            justAdded: true,
            nativeEvent: { offsetX: 113, offsetY: 18 },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
      },
    });
    const action = {
      ...blurMock,
      section: 'playground' as keyof PrimitivesSections,
      type: 'SWITCH_OFF_LAST_ADDED',
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
            justAdded: false,
            nativeEvent: null,
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
      },
    });

    expect(reducer(stateBefore, switchOffLastAdded(action))).toEqual(stateAfter);
  });

  // SWAP_PRIMITIVES
  // ------------------------------

  it('swapPrimitives: should swap primitives', () => {
    const stateBefore = mockState({
      sections: {
        playground: [blurMock, blendMock],
      },
    });
    const action = {
      indexes: { from: 0, to: 1 },
      section: 'playground' as keyof PrimitivesSections,
      swapSnapshot: 'blur-0,blend-1',
      type: 'SWAP_PRIMITIVES',
    };
    const stateAfter = mockState({
      sections: {
        playground: [blendMock, blurMock],
      },
      swapSnapshot: 'blur-0,blend-1',
    });

    expect(reducer(stateBefore, swapPrimitives(action))).toEqual(stateAfter);
  });

  // PURGE_PRIMITIVES
  // ------------------------------

  it('purgePrimitives: should purge given list', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
      },
    });
    const action = {
      section: 'playground' as keyof PrimitivesSections,
      type: 'PURGE_PRIMITIVES',
    };
    const stateAfter = mockState({
      sections: {
        playground: [],
      },
    });

    expect(reducer(stateBefore, purgePrimitives(action))).toEqual(stateAfter);
  });

  // SWITCH_CHILD
  // ------------------------------

  it('switchChild: should enable one child & disable others', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...diffuseLighting,
            children: [
              {
                ...distantLightMock,
                disabled: false,
              },
              {
                ...pointLightMock,
                disabled: true,
              },
              {
                ...spotLightMock,
                disabled: true,
              },
            ],
          },
        ],
      },
    });
    const action = {
      id: 'pointLight',
      parentId: 'diffuseLighting',
      section: 'playground' as keyof PrimitivesSections,
      type: 'SWITCH_CHILD',
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...diffuseLighting,
            children: [
              {
                ...distantLightMock,
                disabled: true,
              },
              {
                ...pointLightMock,
                disabled: false,
              },
              {
                ...spotLightMock,
                disabled: true,
              },
            ],
          },
        ],
      },
    });

    expect(reducer(stateBefore, switchChild(action))).toEqual(stateAfter);
  });

  // MOVE_TO_PLAYGROUND
  // ------------------------------

  it('moveToPlayground: should move given section items to playground', () => {
    const stateBefore = mockState({
      sections: {
        presets: [
          {
            ...blurMock,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
        playground: [],
      },
    });
    const action = {
      section: 'presets' as keyof PrimitivesSections,
      type: 'MOVE_TO_PLAYGROUND',
    };
    const stateAfter = mockState({
      sections: {
        presets: [
          {
            ...blurMock,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
        playground: [
          {
            ...blurMock,
            params: {
              in: {
                value: 'SourceGraphic',
              },
            },
          },
          {
            ...blendMock,
            params: {
              in: {
                value: 'blur',
              },
            },
          },
        ],
      },
    });

    expect(reducer(stateBefore, moveToPlayground(action))).toEqual(stateAfter);
  });

  // TOGGLE_DOCS
  // ------------------------------

  it('0️⃣ toggleDocs: should toggle docs for given item', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
          },
          {
            ...blendMock,
          },
        ],
      },
    });
    const action = {
      section: 'playground' as keyof PrimitivesSections,
      ...blurMock,
      type: 'TOGGLE_DOCS',
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...blurMock,
            showDocs: true,
          },
          {
            ...blendMock,
          },
        ],
      },
    });

    expect(reducer(stateBefore, toggleDocs(action))).toEqual(stateAfter);
  });

  it('1️⃣ toggleDocs: should toggle docs for given child', () => {
    const stateBefore = mockState({
      sections: {
        playground: [
          {
            ...mergeMock,
            children: [
              mergeNodeMock,
              {
                ...mergeNodeMock,
                id: 'mergeNode1',
              },
            ],
          },
          {
            ...blendMock,
          },
        ],
      },
    });
    const action = {
      section: 'playground' as keyof PrimitivesSections,
      ...mergeMock,
      childId: 'mergeNode1',
      type: 'TOGGLE_DOCS',
    };
    const stateAfter = mockState({
      sections: {
        playground: [
          {
            ...mergeMock,
            children: [
              mergeNodeMock,
              {
                ...mergeNodeMock,
                id: 'mergeNode1',
                showDocs: true,
              },
            ],
          },
          {
            ...blendMock,
          },
        ],
      },
    });

    expect(reducer(stateBefore, toggleDocs(action))).toEqual(stateAfter);
  });

  it('addPreset: should add preset primitives to page', () => {
    const stateBefore = mockState({
      filter: {
        ...getInitialState().filter,
        colorInterpolationFilters: 'sRGB',
      },
    });
    const action = {
      primitives: [blurMock, blendMock],
      colorInterpolationFilters: 'linearRGB' as Interpolation,
    };
    const stateAfter = mockState({
      sections: {
        playground: [],
        presets: [blurMock, blendMock],
      },
      filter: {
        ...getInitialState().filter,
        colorInterpolationFilters: 'linearRGB',
      },
    });

    expect(reducer(stateBefore, addPresetPrimitivesToStage(action))).toEqual(stateAfter);
  });
});
