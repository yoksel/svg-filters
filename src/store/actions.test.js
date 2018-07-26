import {createAction} from './actions';

describe('actions', () => {
  it(
    'createAction must return action (getting props)',
    () => {
      const propsNames = [
        'id',
        'name',
        'groupName',
        'zeroValue',
        'params',
        'children'
      ];

      const props = {
        id: 'blur',
        name: 'Blur',
        groupName: 'Blur',
        zeroValue: 0,
        params: {
          'stdDeviation': {
            'value': '3 10',
            'min': 0,
            'step': 1,
            'type': 'number',
            'double': true
          },
          'in': {
            'value': 'SourceGraphic',
            'type': 'select'
          },
          'result': {
            'value': 'blur'
          }
        }
      };

      const expected = {
        type: 'ADD_PRIMITIVE',
        id: props.id,
        name: props.name,
        groupName: props.groupName,
        zeroValue: 0,
        params: props.params
      };

      expect(
        createAction('ADD_PRIMITIVE', propsNames)(props)
      ).toEqual(expected);
    });
});

describe('actions', () => {
  it(
    'createAction must return action (getting props & value)',
    () => {
      const propsNames = [
        'id',
        'name',
        'groupName',
        'params',
        'children'
      ];

      const props = {
        id: 'blur',
        name: 'Blur',
        groupName: 'Blur',
        params: {
          'stdDeviation': {
            'value': '3 10',
            'min': 0,
            'step': 1,
            'type': 'number',
            'double': true
          },
          'in': {
            'value': 'SourceGraphic',
            'type': 'select'
          },
          'result': {
            'value': 'blur'
          }
        }
      };

      const expected = {
        type: 'ADD_PRIMITIVE',
        id: props.id,
        name: props.name,
        groupName: props.groupName,
        params: props.params,
        value: 'Hello'
      };

      expect(
        createAction('ADD_PRIMITIVE', propsNames)(props, 'Hello')
      ).toEqual(expected);
    });
});
