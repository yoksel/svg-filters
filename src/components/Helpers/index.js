export const deepClone = (obj) => {
  const resultObj = {};

  for (let key in obj) {
    if(typeof obj[key] === 'object') {
      resultObj[key] = deepClone(obj[key]);
    }
    else {
      resultObj[key] = obj[key];
    }
  }

  return resultObj;
};

/**
 * A little function to help us with reordering the result
 */
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default {
  deepClone: deepClone
};
