import deepFreeze from '../../helpers/deepFreeze';

import * as primitivesReducers from './primitives';

// ADD_PRIMITIVE
// ------------------------------

describe('reducers', () => {
  it('ADD_PRIMITIVE: should add primitive to state', () => {
    const stateBefore = {
      list: []
    };
    const action = {
      type: 'ADD_PRIMITIVE',
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
      list: [
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
      list: [
        {
          id: 'blur',
          groupName: 'blur',
          children: undefined,
          disabled: false,
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
      item: {
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
    };
    const stateAfter = {
      list: [
        {
          id: 'blend',
          groupName: 'blend',
          children: undefined,
          disabled: false,
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
      list: [
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
      id: 'blur'
    };
    const stateAfter = {
      list: [
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
      list: [
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
      id: 'blur1'
    };
    const stateAfter = {
      list: [
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
      list: [
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
      id: 'blur1',
      param: 'mode',
      value: 'screen'
    };
    const stateAfter = {
      list: [
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
      list: [
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
      id: 'blur1',
      disabled: true,
    };
    const stateAfter = {
      list: [
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
      list: [
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
      id: 'merge',
      childId: 'mergeNode',
      disabled: true,
    };
    const stateAfter = {
      list: [
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
      list: [
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
      id: 'blur',
      param: 'mode',
      value: 'screen',
      disabled: true
    };
    const stateAfter = {
      list: [
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
      list: [
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
      id: 'blur',
      param: 'mode',
      value: 'screen',
      propType: 'string'
    };
    const stateAfter = {
      list: [
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
      list: [
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
      type: 'UPDATE_INS'
    };
    const stateAfter = {
      list: [
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
      list: [
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
      type: 'UPDATE_INS'
    };
    const stateAfter = {
      list: [
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
      list: [
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
      type: 'UPDATE_INS'
    };
    const stateAfter = {
      list: [
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
