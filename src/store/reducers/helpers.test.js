import deepFreeze from '../../helpers/deepFreeze';

import * as helpers from './helpers';

// idKeeper
// ------------------------------

describe('store helpers', () => {
  it(
    'idKeeper should return the same ID in it doesn\'t exist yet',
    () => {
      const stateBefore = {};
      const groupName = 'blur';
      const stateAfter = 'blur';
      const keeperTools = helpers.idKeeper();

      expect(
        keeperTools.getId(groupName)
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
      const keeperTools = helpers.idKeeper();
      keeperTools.getId(groupName);

      expect(
        keeperTools.getId(groupName)
      ).toEqual(stateAfter);
    });
});

// swap
// ------------------------------

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

// getLastResult
// ------------------------------

describe('store helpers', () => {
  it(
    'getLastResult should return last result',
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
        }
      ];

      const stateAfter = 'blend';

      expect(
        helpers.getLastResult(stateBefore)
      ).toEqual(stateAfter);
    });
});

describe('store helpers', () => {
  it(
    'getLastResult should return last result without disabled',
    () => {
      const stateBefore = [
        {
          id: 'blur'
        },
        {
          id: 'turbulence'
        },
        {
          id: 'blend',
          disabled: true
        }
      ];

      const stateAfter = 'turbulence';

      expect(
        helpers.getLastResult(stateBefore)
      ).toEqual(stateAfter);
    });
});

// getAllEnabledResultsObj
// ------------------------------

describe('store helpers', () => {
  it(
    'getAllEnabledResultsObj should results in object',
    () => {
      const stateBefore = [
        {
          id: 'blur'
        },
        {
          id: 'turbulence',
          disabled: true
        },
        {
          id: 'blend'
        }
      ];

      deepFreeze(stateBefore);

      const stateAfter = {
        blur: 'blur',
        blend: 'blend'
      };

      expect(
        helpers.getAllEnabledResultsObj(stateBefore)
      ).toEqual(stateAfter);
    });
});
