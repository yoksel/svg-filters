import deepFreeze from '../../helpers/deepFreeze';

import * as primitivesReducers from './primitives';
import * as primitiveControlsReducers from './primitiveControls';

describe('actions', () => {
  it(
    'idKeeper should return the same ID in it doesn\'t exist yet',
    () => {
      const stateBefore = {};
      const groupName = 'blur';
      const stateAfter = 'blur';
      const getId = primitivesReducers.idKeeper();

      expect(
        getId(groupName)
      ).toEqual(stateAfter);
    });
});

describe('actions', () => {
  it(
    'idKeeper should return unical id for group',
    () => {
      const stateBefore = {};
      const groupName = 'blur';
      const stateAfter = 'blur1';
      const getId = primitivesReducers.idKeeper();
      getId(groupName);

      expect(
        getId(groupName)
      ).toEqual(stateAfter);
    });
});

describe('actions', () => {
  it('ADD_PRIMITIVE: should add primitive to state', () => {
    const stateBefore = [];
    const action = {
      type: 'ADD_PRIMITIVE',
      id: 'blur',
      name: 'Hello',
      groupName: 'blur',
      params: {
        'stdDeviation': {
          'value': 4,
          'type': 'number'
        },
        'mode': {
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
          'multiply',
          'screen',
          'darken',
          'lighten'
        ]
      ]
    };
    const stateAfter = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4,
            'type': 'number'
          },
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
          ]
        ]
      }
    ];

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

describe('actions', () => {
  it('DUPLICATE_PRIMITIVE: should duplicate primitive in state', () => {
    const stateBefore = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4,
            'type': 'number'
          },
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
          ]
        ]
      }
    ];
    const action = {
      type: 'DUPLICATE_PRIMITIVE',
      id: 'blur'
    };
    const stateAfter = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4,
            'type': 'number'
          },
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
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
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
          ]
        ]
      }
    ];

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

describe('actions', () => {
  it('DELETE_PRIMITIVE: should delete primitive from state by ID', () => {
    const stateBefore = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4,
            'type': 'number'
          },
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
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
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
          ]
        ]
      }
    ];
    const action = {
      type: 'DELETE_PRIMITIVE',
      id: 'blur1'
    };
    const stateAfter = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4,
            'type': 'number'
          },
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
          ]
        ]
      }
    ];

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});

describe('actions', () => {
  it('CHANGE_PRIMITIVE_PROP: should change primitive param value', () => {
    const stateBefore = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4,
            'type': 'number'
          },
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
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
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
          ]
        ]
      }
    ];
    const action = {
      type: 'CHANGE_PRIMITIVE_PROP',
      id: 'blur1',
      param: 'mode',
      value: 'screen'
    };
    const stateAfter = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          'stdDeviation': {
            'value': 4,
            'type': 'number'
          },
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
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
          'mode': {
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
            'multiply',
            'screen',
            'darken',
            'lighten'
          ]
        ]
      }
    ];

    deepFreeze(stateBefore);

    expect(
      primitivesReducers.primitives(stateBefore, action)
    ).toEqual(stateAfter);
  });
});
