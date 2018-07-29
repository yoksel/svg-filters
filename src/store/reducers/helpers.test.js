import deepFreeze from '../../helpers/deepFreeze';

import * as helpers from './helpers';

describe('store helpers', () => {
  it(
    'idKeeper should return the same ID in it doesn\'t exist yet',
    () => {
      const stateBefore = {};
      const groupName = 'blur';
      const stateAfter = 'blur';
      const getId = helpers.idKeeper();

      expect(
        getId(groupName)
      ).toEqual(stateAfter);
    });
});

describe('store helpers', () => {
  it(
    'idKeeper should return unical id for group',
    () => {
      const stateBefore = {};
      const groupName = 'blur';
      const stateAfter = 'blur1';
      const getId = helpers.idKeeper();
      getId(groupName);

      expect(
        getId(groupName)
      ).toEqual(stateAfter);
    });
});
