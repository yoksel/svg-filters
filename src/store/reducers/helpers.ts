// @ts-nocheck

import { PrimitiveItem } from '../../components/molecules/Primitive';
import { PrimitivesState, Section } from '../types';

const reduceStateToCounterObj = (state: PrimitiveItem[]) => {
  return state.reduce((prev, item) => {
    const groupName = item.groupName;
    const orderNum = Number(item.id.replace(groupName, ''));

    if (prev[groupName] !== undefined) {
      if (prev[groupName] > orderNum) {
        prev[groupName] = ++prev[groupName];
      } else {
        prev[groupName] = orderNum;
      }
    } else {
      prev[groupName] = orderNum;
    }

    if (item.children) {
      const childrenReduce = reduceStateToCounterObj(item.children);
      prev = Object.assign(prev, childrenReduce);
    }

    return prev;
  }, {});
};

// Fill counter with state for section
const fillCounter = (state: PrimitivesState) => {
  let counterObj = {};

  if (state) {
    counterObj = reduceStateToCounterObj(state);
  }

  return counterObj;
};

export const idKeeper = () => {
  const groupIdCounter: { [key: string]: number } = {};

  const addSection = (state: PrimitivesState, section: Section) => {
    // If state was filled from localStorage,
    // need fill groupIdCounter with existed IDs
    groupIdCounter[section] = fillCounter(state);
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

export const resetIdKeeperSection = (state: PrimitivesState, section: Section) => {
  keeperTools.addSection(state, section);
};

export const purgeIdKeeperSection = (section: Section) => {
  keeperTools.purgeSection(section);
};

export const getAllEnabledResultsObj = (state: PrimitivesState) => {
  const results = state.reduce((prev, item) => {
    if (item.disabled) {
      return prev;
    }

    prev[item.id] = item.id;
    return prev;
  }, {});

  return results;
};

export const getLastResult = (state: PrimitivesState) => {
  let result = 'SourceGraphic';
  const newState = state.filter((item) => !item.disabled);
  const last = newState[newState.length - 1];

  if (last) {
    result = last.id;
  }
  return result;
};

interface updateUniquePropsArgs {
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
}: updateUniquePropsArgs) => {
  if (!keeperTools.checkSection(section)) {
    keeperTools.addSection(sectionState, section);
  }

  if (!primitive) {
    console.log({ primitive });
    throw new Error('No primitive passed to updateUniqueProps');
  }

  const newPrimitive = structuredClone(primitive);
  let newIn = getLastResult(sectionState);
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
        state,
        primitive: item,
        section,
      });
    });
  }

  return newPrimitive;
};

export const swap = (items, positions) => {
  const { from, to } = positions;
  const itemFrom = items.splice(from, 1)[0];
  items.splice(to, 0, itemFrom);

  return items;
};

export const getFilteredWithIndex = (list, id) => {
  let pos = 0;
  const filteredList = list.filter((item, index) => {
    if (item.id === id) {
      pos = index;
      return true;
    }
    return false;
  });

  const filtered = filteredList[0];

  return {
    pos,
    filtered,
  };
};

export const getIn = (state: PrimitivesState, section: Section) => {
  const list = state[section];
  const allEnabledResultsObj = getAllEnabledResultsObj(list);

  const defaultSources = {
    SourceGraphic: 'SourceGraphic',
    SourceAlpha: 'SourceAlpha',
  };

  const updateItem = ({
    item,
    index,
    isChild,
  }: {
    item: PrimitiveItem;
    index: number;
    isChild?: boolean;
  }) => {
    const clonedItem = structuredClone(item);
    const previousItems = list.slice(0, index);
    const initialValue = clonedItem.params.in.value;
    const prevValue = clonedItem.params.in.prevValue;
    const lastResult = getLastResult(previousItems);
    let newValue = lastResult;

    // SAVE
    // Value not inherited, need to keep
    if (index === 0) {
      // First primitive in list
      if (!isChild) {
        newValue = initialValue;
      }
    } else {
      // SourceGraphic || SourceAlpha
      if (defaultSources[initialValue]) {
        newValue = initialValue;
      } else {
        if (!allEnabledResultsObj[initialValue]) {
          // in-elem not available
          clonedItem.params.in.prevValue = initialValue;
        } else {
          newValue = initialValue;
        }
      }
    }

    // SET BACK
    // Use prev value if it available
    if (prevValue && allEnabledResultsObj[prevValue]) {
      newValue = prevValue;
      delete clonedItem.params.in.prevValue;
    }

    clonedItem.params.in.value = newValue;
    return clonedItem;
  };

  return {
    updateItem,
  };
};
