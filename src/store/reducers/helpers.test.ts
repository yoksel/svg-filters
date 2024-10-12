import { idKeeperConstructor } from './helpers/idKeeper';

describe('store helpers', () => {
  // idKeeper
  // ------------------------------

  describe('idKeeper()', () => {
    it("idKeeper should return the same ID if it doesn't exist yet", () => {
      const groupName = 'blend';
      const stateAfter = 'blend';
      const keeperTools = idKeeperConstructor();

      expect(keeperTools.getUniqueId(groupName, 'playground')).toEqual(stateAfter);
    });

    it('idKeeper should return unique id for group', () => {
      const groupName = 'blur';
      const stateAfter = 'blur1';
      const keeperTools = idKeeperConstructor();
      keeperTools.getUniqueId(groupName, 'playground');

      expect(keeperTools.getUniqueId(groupName, 'playground')).toEqual(stateAfter);
    });
  });
});
