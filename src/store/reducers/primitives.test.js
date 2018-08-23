import deepFreeze from '../../helpers/deepFreeze';

import * as primitivesReducers from './primitives';

// ADD_PRIMITIVE
// ------------------------------

describe('reducers', () => {
  it('ADD_PRIMITIVE: should add primitive to state', () => {
    const stateBefore = {
      playground: []
    };
    const action = {
      type: 'ADD_PRIMITIVE',
      section: 'playground',
      item: {
        id: 'blur',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4
          },
          result: {
            value: 'blur'
          }
        }
      },
      nativeEvent: {
        'offsetX': 108,
        'offsetY': 12
      }
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          justAdded: true,
          children: undefined,
          disabled: false,
          params: {
            'stdDeviation': {
              'value': 4
            },
            result: {
              value: 'blur'
            }
          },
          nativeEvent: {
            'offsetX': 108,
            'offsetY': 12
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// DISCOVERY_PRIMITIVE
// ------------------------------

describe('reducers', () => {
  it('DISCOVERY_PRIMITIVE: should add primitive to state and replace existed', () => {
    const stateBefore = {
      docs: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4
            },
            result: {
              value: 'blur'
            }
          }
        }
      ]
    };
    const action = {
      type: 'DISCOVERY_PRIMITIVE',
      primitives: [
        {
          id: 'blend',
          groupName: 'blend',
          params: {
            'mode': {
              'value': 'multiply'
            },
            result: {
              value: 'blend'
            }
          }
        }
      ]
    };
    const stateAfter = {
      docs: [
        {
          id: 'blend',
          groupName: 'blend',
          params: {
            'mode': {
              'value': 'multiply'
            },
            result: {
              value: 'blend'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// DUPLICATE_PRIMITIVE
// ------------------------------

describe('reducers', () => {
  it('DUPLICATE_PRIMITIVE: should duplicate primitive in state', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4
            },
            in: {
              value: 'blend'
            },
            in2: {
              value: 'flood'
            },
            result: {
              value: 'blur'
            }
          }
        }
      ]
    };
    const action = {
      type: 'DUPLICATE_PRIMITIVE',
      id: 'blur',
      section: 'playground'
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4
            },
            in: {
              value: 'blend'
            },
            in2: {
              value: 'flood'
            },
            result: {
              value: 'blur'
            }
          }
        },
        {
          id: 'blur1',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4
            },
            in: {
              value: 'blend'
            },
            in2: {
              value: 'flood'
            },
            result: {
              value: 'blur1'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// DELETE_PRIMITIVE
// ------------------------------

describe('reducers', () => {
  it('DELETE_PRIMITIVE: should delete primitive from state by ID', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4
            },
            result: {
              value: 'blur'
            }
          }
        },
        {
          id: 'blur1',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4
            },
            result: {
              value: 'blur1'
            }
          }
        }
      ]
    };
    const action = {
      type: 'DELETE_PRIMITIVE',
      section: 'playground',
      id: 'blur1'
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4
            },
            result: {
              value: 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// CHANGE_PRIMITIVE_PROP
// ------------------------------

describe('reducers', () => {
  it('CHANGE_PRIMITIVE_PROP: should change primitive param value', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur1',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply'
            },
            result: {
              value: 'blur1'
            }
          }
        }
      ]
    };
    const action = {
      type: 'CHANGE_PRIMITIVE_PROP',
      section: 'playground',
      id: 'blur1',
      param: 'mode',
      value: 'screen'
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur1',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'screen'
            },
            result: {
              value: 'blur1'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// TOGGLE_PRIMITIVE
// ------------------------------

describe('reducers', () => {
  it('TOGGLE_PRIMITIVE: should toggle primitive status', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur1',
          groupName: 'blur',
          disabled: false,
          params: {
            mode: {
              'value': 'multiply'
            },
            result: {
              value: 'blur1'
            }
          }
        }
      ]
    };
    const action = {
      type: 'TOGGLE_PRIMITIVE',
      section: 'playground',
      id: 'blur1',
      disabled: true,
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur1',
          groupName: 'blur',
          disabled: true,
          params: {
            mode: {
              'value': 'multiply'
            },
            result: {
              value: 'blur1'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

describe('reducers', () => {
  it('TOGGLE_PRIMITIVE: should toggle child primitive status', () => {
    const stateBefore = {
      playground: [
        {
          id: 'merge',
          groupName: 'merge',
          params: {
            result: {
              'value': 'merge'
            }
          },
          'children': [
            {
              id: 'mergeNode',
              groupName: 'mergeNode',
              params: {
                'in': {
                  'value': 'SourceGraphic'
                },
                result: {
                  'value': 'mergeNode'
                }
              }
            }
          ]
        }

      ]
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
              'value': 'merge'
            }
          },
          'children': [
            {
              id: 'mergeNode',
              groupName: 'mergeNode',
              disabled: true,
              params: {
                'in': {
                  'value': 'SourceGraphic'
                },
                result: {
                  'value': 'mergeNode'
                }
              }
            }
          ]
        }

      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// TOGGLE_PROP
// ------------------------------

describe('reducers', () => {
  it('TOGGLE_PROP: should toggle primitive param', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply'
            },
            result: {
              value: 'blur'
            }
          }
        }
      ]
    };
    const action = {
      type: 'TOGGLE_PROP',
      section: 'playground',
      id: 'blur',
      param: 'mode',
      value: 'screen',
      disabled: true
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply',
              'disabled': true
            },
            result: {
              value: 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// CHANGE_PROP_TYPE
// ------------------------------

describe('reducers', () => {
  it('CHANGE_PROP_TYPE: should change primitive param type', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply',
              'type': 'select'
            },
            result: {
              value: 'blur'
            }
          }
        }
      ]
    };
    const action = {
      type: 'CHANGE_PROP_TYPE',
      section: 'playground',
      id: 'blur',
      param: 'mode',
      value: 'screen',
      propType: 'string'
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply',
              'type': 'string'
            },
            result: {
              value: 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// UPDATE_INS
// ------------------------------

describe('reducers', () => {
  it('0️⃣  UPDATE_INS: should update attributes `in`', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          disabled: true,
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
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
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'SourceGraphic',
              'prevValue': 'blur'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blend',
              'prevValue': 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

describe('reducers', () => {
  it('1️⃣  UPDATE_INS: should keep previous attribute `in`', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          disabled: true,
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
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
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'SourceGraphic',
              'prevValue': 'blur'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blend',
              'prevValue': 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

describe('reducers', () => {
  it('2️⃣  UPDATE_INS: should place previous attribute `in` if it available again', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'SourceGraphic',
              'prevValue': 'blur'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blend',
              'prevValue': 'blur'
            }
          }
        }
      ]
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
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// SWITCH_OFF_LAST_ADDED
// ------------------------------

describe('reducers', () => {
  it('SWITCH_OFF_LAST_ADDED: should switch off prop by primitive id', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          },
          justAdded: true,
          nativeEvent: {offsetX: 113, offsetY: 18}
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };
    const action = {
      id: 'blur',
      section: 'playground',
      type: 'SWITCH_OFF_LAST_ADDED'
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          },
          justAdded: false,
          nativeEvent: null
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// SWAP_PRIMITIVES
// ------------------------------

describe('reducers', () => {
  it('SWAP_PRIMITIVES: should swap primitives', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };
    const action = {
      indexes: {from: 0, to: 1},
      section: 'playground',
      swapSnapshot: 'blur-0,blend-1',
      type: 'SWAP_PRIMITIVES'
    };
    const stateAfter = {
      playground: [
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        },
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        }
      ],
      'swapSnapshot': 'blur-0,blend-1'
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// PURGE_PRIMITIVES
// ------------------------------

describe('reducers', () => {
  it('PURGE_PRIMITIVES: should purge given list', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };
    const action = {
      section: 'playground',
      type: 'PURGE_PRIMITIVES'
    };
    const stateAfter = {
      playground: []
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// SWITCH_CHILD
// ------------------------------

describe('reducers', () => {
  it('SWITCH_CHILD: should enable one child & disable others', () => {
    const stateBefore = {
      playground: [
        {
          id: 'diffuseLighting',
          children: [
            {
              id: 'distantLight',
              disabled: false
            },
            {
              id: 'pointLight',
              disabled: true
            },
            {
              id: 'spotLight',
              disabled: true
            }
          ]
        }
      ]
    };
    const action = {
      id: 'pointLight',
      parentId: 'diffuseLighting',
      section: 'playground',
      type: 'SWITCH_CHILD'
    };
    const stateAfter = {
      playground: [
        {
          id: 'diffuseLighting',
          children: [
            {
              id: 'distantLight',
              disabled: true
            },
            {
              id: 'pointLight',
              disabled: false
            },
            {
              id: 'spotLight',
              disabled: true
            }
          ]
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// MOVE_TO_PLAYGROUND
// ------------------------------

describe('reducers', () => {
  it('MOVE_TO_PLAYGROUND: should move given section items to playground', () => {
    const stateBefore = {
      presets: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ],
      playground: []
    };
    const action = {
      section: 'presets',
      type: 'MOVE_TO_PLAYGROUND'
    };
    const stateAfter = {
      presets: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ],
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

// TOGGLE_DOCS
// ------------------------------

describe('reducers', () => {
  it('0️⃣ TOGGLE_DOCS: should toggle docs for given item', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };
    const action = {
      section: 'playground',
      id: 'blur',
      type: 'TOGGLE_DOCS'
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          },
          showDocs: true
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

describe('reducers', () => {
  it('1️⃣ TOGGLE_DOCS: should toggle docs for given child', () => {
    const stateBefore = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          },
          children: [
            {
              id: 'mergeNode'
            },
            {
              id: 'mergeNode1'
            }
          ]
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };
    const action = {
      section: 'playground',
      id: 'blur',
      childId: 'mergeNode1',
      type: 'TOGGLE_DOCS'
    };
    const stateAfter = {
      playground: [
        {
          id: 'blur',
          params: {
            in: {
              'value': 'SourceGraphic'
            }
          },
          children: [
            {
              id: 'mergeNode'
            },
            {
              id: 'mergeNode1',
              showDocs: true
            }
          ]
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur'
            }
          }
        }
      ]
    };

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});
