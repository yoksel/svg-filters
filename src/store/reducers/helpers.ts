import { PrimitiveItem, Section, SectionState } from '../types';
import deepClone from '../../helpers/deepClone';
import countItemsInGroups from './helpers/countItemsInGroups';
import getLastResultIdFromPrimitivesList from './helpers/getLastResultIdFromPrimitivesList';
import updateInPropInPrimitiveItem from './helpers/updateInPropInPrimitiveItem';

// to fix: clarify name
interface Counter {
  [key: string]: number;
}

export const idKeeper = () => {
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

  const checkSection = (section: Section) => {
    return Boolean(groupIdCounter[section]);
  };

  const getId = (groupName: string, section: Section) => {
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
    checkSection,
    purgeSection,
    getId,
  };
};

const keeperTools = idKeeper();

export const resetIdKeeperSection = (state: PrimitiveItem[], section: Section) => {
  keeperTools.addSection(state, section);
};

export const purgeIdKeeperSection = (section: Section) => {
  keeperTools.purgeSection(section);
};

interface UpdateUniquePropsArgs {
  sectionState: SectionState;
  primitive: PrimitiveItem;
  actionType: string;
  section: Section;
}

export const updateUniqueProps = ({
  sectionState,
  primitive,
  actionType,
  section,
}: UpdateUniquePropsArgs) => {
  if (!keeperTools.checkSection(section)) {
    keeperTools.addSection(sectionState, section);
  }

  if (!primitive) {
    throw new Error('No primitive passed to updateUniqueProps');
  }

  const newPrimitive = deepClone(primitive);
  let newIn = getLastResultIdFromPrimitivesList(sectionState);
  let newIdAdd = newPrimitive.id;

  if (section !== 'docs') {
    newIdAdd = keeperTools.getId(newPrimitive.groupName, section);
  }

  newPrimitive.id = newIdAdd;

  if (newPrimitive.params) {
    if (newPrimitive.params.result) {
      newPrimitive.params.result.value = newIdAdd;
    }

    if (actionType !== 'DUPLICATE_PRIMITIVE') {
      if (newPrimitive.params.in2) {
        // In + In2
        newPrimitive.params.in.value = 'SourceGraphic';
        newPrimitive.params.in2.value = newIn;

        if (newPrimitive.groupName === 'composite') {
          newPrimitive.params.in.value = newIn;
          newPrimitive.params.in2.value = 'SourceAlpha';
        }
      } else if (newPrimitive.params.in) {
        // In only
        newPrimitive.params.in.value = newIn;
      }
    }
  }

  if (newPrimitive.children) {
    newPrimitive.children = newPrimitive.children.map((item) => {
      return updateUniqueProps({
        sectionState,
        primitive: item,
        section,
        actionType,
      });
    });
  }

  return newPrimitive;
};

export const getFilteredWithIndex = (list: PrimitiveItem[], id: string) => {
  let pos = 0;
  const filteredList = list?.filter((item, index) => {
    if (item.id === id) {
      pos = index;
      return true;
    }
    return false;
  });

  const filtered = filteredList?.[0];

  return {
    pos,
    filtered,
  };
};
