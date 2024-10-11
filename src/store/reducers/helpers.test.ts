import deepFreeze from '../../helpers/deepFreeze';

import * as helpers from './helpers';
import { blendMock, blurMock, floodMock, mergeMock, turbulenceMock } from './mocks';

describe('store helpers', () => {
  // idKeeper
  // ------------------------------

  describe('idKeeper()', () => {
    it("idKeeper should return the same ID in it doesn't exist yet", () => {
      const groupName = 'blur';
      const stateAfter = 'blur';
      const keeperTools = helpers.idKeeper();

      expect(keeperTools.getId(groupName, 'playground')).toEqual(stateAfter);
    });

    it('idKeeper should return unique id for group', () => {
      const groupName = 'blur';
      const stateAfter = 'blur1';
      const keeperTools = helpers.idKeeper();
      keeperTools.getId(groupName, 'playground');

      expect(keeperTools.getId(groupName, 'playground')).toEqual(stateAfter);
    });
  });
});
