import { PrimitiveItem } from '../../types';

export const getFilteredWithPosition = (list: PrimitiveItem[], id: string) => {
  let pos = -1;
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

export default getFilteredWithPosition;
