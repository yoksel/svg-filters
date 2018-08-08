import deepFreeze from '../../helpers/deepFreeze';

import * as primitivesReducers from './primitives';

describe('reducers', () => {
  it('ADD_PRIMITIVE: should add primitive to state', () => {
    const stateBefore = {
      list: []
    };
    const action = {
      type: 'ADD_PRIMITIVE',
      item: {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4,
            'type': 'number'
          },
          result: {
            value: 'blur'
          }
        },
        paramsValues: [
          'mode': [
            'normal',
            'multiply'
          ]
        ]
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
          name: 'Hello',
          groupName: 'blur',
          justAdded: true,
          children: undefined,
          disabled: false,
          params: {
            'stdDeviation': {
              'value': 4,
              'type': 'number'
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
          ],
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

describe('reducers', () => {
  it('DUPLICATE_PRIMITIVE: should duplicate primitive in state', () => {
    const stateBefore = {
      list: [
        {
          id: 'blur',
          name: 'Hello',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4,
              'type': 'number'
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply',
            ]
          ]
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
          name: 'Hello',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4,
              'type': 'number'
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
          ]
        },
        {
          id: 'blur1',
          name: 'Hello',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4,
              'type': 'number'
            },
            result: {
              value: 'blur1'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
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

describe('reducers', () => {
  it('DELETE_PRIMITIVE: should delete primitive from state by ID', () => {
    const stateBefore = {
      list: [
        {
          id: 'blur',
          name: 'Hello',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4,
              'type': 'number'
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
          ]
        },
        {
          id: 'blur1',
          name: 'Hello',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4,
              'type': 'number'
            },
            result: {
              value: 'blur1'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
          ]
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
          name: 'Hello',
          groupName: 'blur',
          params: {
            'stdDeviation': {
              'value': 4,
              'type': 'number'
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
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

describe('reducers', () => {
  it('CHANGE_PRIMITIVE_PROP: should change primitive param value', () => {
    const stateBefore = {
      list: [
        {
          id: 'blur1',
          name: 'Hello',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply',
              'type': 'select'
            },
            result: {
              value: 'blur1'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
          ]
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
          name: 'Hello',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'screen',
              'type': 'select'
            },
            result: {
              value: 'blur1'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
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

// TOGGLE_PRIMITIVE
// ------------------------------

describe('reducers', () => {
  it('TOGGLE_PRIMITIVE: should toggle primitive status', () => {
    const stateBefore = {
      list: [
        {
          id: 'blur1',
          name: 'Hello',
          groupName: 'blur',
          disabled: false,
          params: {
            mode: {
              'value': 'multiply',
              'type': 'select'
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
          name: 'Hello',
          groupName: 'blur',
          disabled: true,
          params: {
            mode: {
              'value': 'multiply',
              'type': 'select'
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
          name: 'feMerge',
          params: {
            result: {
              'value': 'merge'
            }
          },
          'children': [
            {
              id: 'mergeNode',
              groupName: 'mergeNode',
              name: 'feMergeNode',
              params: {
                'in': {
                  'value': 'SourceGraphic',
                  'type': 'select'
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
          name: 'feMerge',
          params: {
            result: {
              'value': 'merge'
            }
          },
          'children': [
            {
              id: 'mergeNode',
              groupName: 'mergeNode',
              name: 'feMergeNode',
              disabled: true,
              params: {
                'in': {
                  'value': 'SourceGraphic',
                  'type': 'select'
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

describe('reducers', () => {
  it('TOGGLE_PROP: should toggle primitive param', () => {
    const stateBefore = {
      list: [
        {
          id: 'blur',
          name: 'Hello',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply',
              'type': 'select'
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
          ]
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
          name: 'Hello',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply',
              'type': 'select',
              'disabled': true
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
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

describe('reducers', () => {
  it('CHANGE_PROP_TYPE: should change primitive param type', () => {
    const stateBefore = {
      list: [
        {
          id: 'blur',
          name: 'Hello',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply',
              'type': 'select'
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
          ]
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
          name: 'Hello',
          groupName: 'blur',
          params: {
            mode: {
              'value': 'multiply',
              'type': 'string'
            },
            result: {
              value: 'blur'
            }
          },
          paramsValues: [
            'mode': [
              'normal',
              'multiply'
            ]
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
              'value': 'SourceGraphic',
              'type': 'select'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur',
              'type': 'select'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blur',
              'type': 'select'
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
              'value': 'SourceGraphic',
              'type': 'select'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'SourceGraphic',
              'prevValue': 'blur',
              'type': 'select'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blend',
              'prevValue': 'blur',
              'type': 'select'
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
              'value': 'SourceGraphic',
              'type': 'select'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur',
              'type': 'select'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blur',
              'type': 'select'
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
              'value': 'SourceGraphic',
              'type': 'select'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'SourceGraphic',
              'prevValue': 'blur',
              'type': 'select'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blend',
              'prevValue': 'blur',
              'type': 'select'
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
              'value': 'SourceGraphic',
              'type': 'select'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'SourceGraphic',
              'prevValue': 'blur',
              'type': 'select'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blend',
              'prevValue': 'blur',
              'type': 'select'
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
              'value': 'SourceGraphic',
              'type': 'select'
            }
          }
        },
        {
          id: 'blend',
          params: {
            in: {
              'value': 'blur',
              'type': 'select'
            }
          }
        },
        {
          id: 'matrix',
          params: {
            in: {
              'value': 'blur',
              'type': 'select'
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
