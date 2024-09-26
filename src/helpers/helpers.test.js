import deepFreeze from './deepFreeze';
import deepClone from './deepClone';

describe('helpers', () => {
  it(
    'deepFreeze() should prevent object mutation',
    () => {
      const stateBefore = {
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
          result: 'blur'
        },
        paramsValues: [
          'mode': [
            'normal',
            'multiply',
            'screen',
            'darken',
            'lighten'
          ],
          'test': [
            {
              id: 1,
              text: 'hello'
            },
            {
              id: 2,
              text: 'Smile'
            }
          ]
        ]
      };

      deepFreeze(stateBefore);

      const changeProp = () => {
        try {
          stateBefore.params.mode.value = 'darken';
        } catch (err) {
          throw new TypeError();
        }
      };

      /* eslint-disable new-cap */
      expect(
        changeProp
      ).toThrow(TypeError());
      /* eslint-enable new-cap */
    });
});

