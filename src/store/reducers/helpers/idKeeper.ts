import { PrimitiveItem, Section, SectionState } from '../../types';
import countItemsInGroups from './countItemsInGroups';

// to fix: clarify name
interface Counter {
  [key: string]: number;
}

export const idKeeperConstructor = () => {
  const groupIdCounter: { [key: string]: Counter } = {};

  const addSection = (sectionState: SectionState, section: string) => {
    // If state was filled from localStorage,
    // need fill groupIdCounter with existed IDs
    groupIdCounter[section] = countItemsInGroups(sectionState);
  };

  const purgeSection = (section: Section) => {
    // Drop counters after purging section
    groupIdCounter[section] = {};
  };

  const hasSection = (section: Section) => {
    return Boolean(groupIdCounter[section]);
  };

  const getUniqueId = (groupName: string, section: Section) => {
    let newId = groupName;

    if (!groupIdCounter[section]) {
      groupIdCounter[section] = {};
    }

    if (groupIdCounter[section][groupName] !== undefined) {
      newId += ++groupIdCounter[section][groupName];
    } else {
      groupIdCounter[section][groupName] = 0;
    }

    return newId;
  };

  return {
    addSection,
    hasSection,
    purgeSection,
    getUniqueId,
  };
};

const idKeeper = idKeeperConstructor();

export const resetIdKeeperSection = (state: PrimitiveItem[], section: Section) => {
  idKeeper.addSection(state, section);
};

export const purgeIdKeeperSection = (section: Section) => {
  idKeeper.purgeSection(section);
};

export default idKeeper;
