import * as actions from './reducers.js';

describe('actions', () => {
  it(
    'idKeeper should return the same ID in it doesn\'t exist yet',
    () => {
      const stateBefore = {};
      const groupName = 'blur';
      const stateAfter = 'blur';
      const getId = actions.idKeeper();

      expect(
        getId(groupName)
      ).toEqual(stateAfter)
  })
});

describe('actions', () => {
  it(
    'idKeeper should return unical id for group',
    () => {
      const stateBefore = {};
      const groupName = 'blur';
      const stateAfter = 'blur1';
      const getId = actions.idKeeper();
      getId(groupName);

      expect(
        getId(groupName)
      ).toEqual(stateAfter)
  })
});

describe('actions', () => {
  it('Should add primitive to state', () => {
    const stateBefore = [];
    const action = {
      type: 'ADD_PRIMITIVE',
      id: 'blur',
      name: 'Hello',
      groupName: 'blur',
      params: {
        result: 'blur'
      }
    };
    const stateAfter = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          result: 'blur'
        }
      }
    ];

    expect(
      actions.primitives(stateBefore, action)
    ).toEqual(stateAfter)
  })
});

describe('actions', () => {
  it('Should duplicate primitive in state', () => {
    const stateBefore = [
      {
        id: 'blur',
        name: 'Hello',
        groupName: 'blur',
        params: {
          result: 'blur'
        }
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
          result: 'blur'
        }
      },
      {
        id: 'blur1',
        name: 'Hello',
        groupName: 'blur',
        params: {
          result: 'blur1'
        }
      }
    ];
    expect(
      actions.primitives(stateBefore, action)
    ).toEqual(stateAfter)
  })
});
