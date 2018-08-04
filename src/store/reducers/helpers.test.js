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

describe('store helpers', () => {
  it(
    'swap should move elements by indexes: 2 -> 0',
    () => {
      const stateBefore = [
        {
          id: 'blur'
        },
        {
          id: 'turbulence'
        },
        {
          id: 'blend'
        },
        {
          id: 'flood'
        }
      ];

      const positions = {
        from: 2,
        to: 0
      };

      const stateAfter = [
        {
          id: 'blend'
        },
        {
          id: 'blur'
        },
        {
          id: 'turbulence'
        },
        {
          id: 'flood'
        }
      ];

      expect(
        helpers.swap(stateBefore, positions)
      ).toEqual(stateAfter);
    });
});

describe('store helpers', () => {
  it(
    'swap should move elements by indexes: 2 -> 0',
    () => {
      const stateBefore = [
        {
          id: 'blur'
        },
        {
          id: 'turbulence'
        },
        {
          id: 'blend'
        },
        {
          id: 'flood'
        }
      ];

      const positions = {
        from: 0,
        to: 2
      };

      const stateAfter = [
        {
          id: 'turbulence'
        },
        {
          id: 'blend'
        },
        {
          id: 'blur'
        },
        {
          id: 'flood'
        }
      ];

      expect(
        helpers.swap(stateBefore, positions)
      ).toEqual(stateAfter);
    });
});
