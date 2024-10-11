import { SectionState } from '../../types';
import { Counter } from '../types';

const countItemsInGroups = (state: SectionState): Counter | {} => {
  if (!state?.length) return {};

  return state.reduce<{ [key: string]: number }>((prev, item) => {
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
      const childrenReduce = countItemsInGroups(item.children);
      prev = Object.assign(prev, childrenReduce);
    }

    return prev;
  }, {});
};

export default countItemsInGroups;
