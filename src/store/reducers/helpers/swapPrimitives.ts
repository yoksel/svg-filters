import { PrimitiveItem } from '../../types';

const swapPrimitives = (items: PrimitiveItem[], positions: { from: number; to: number }) => {
  const { from, to } = positions;
  const itemFrom = items.splice(from, 1)[0];
  items.splice(to, 0, itemFrom);

  return items;
};

export default swapPrimitives;
