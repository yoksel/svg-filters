import deepClone from '../../../helpers/deepClone';
import { PrimitiveItem } from '../../types';
import getAllEnabledResultsIds from './getAllEnabledResultsIds';
import getLastResultIdFromPrimitivesList from './getLastResultIdFromPrimitivesList';

export const defaultSources = {
  SourceGraphic: 'SourceGraphic',
  SourceAlpha: 'SourceAlpha',
};

const isValueDefaultSource = (value: string): value is keyof typeof defaultSources => {
  return value in defaultSources;
};

const updateInPropInPrimitiveItem = ({
  list,
  item,
  index,
  isChild,
}: {
  list: PrimitiveItem[];
  item: PrimitiveItem;
  index: number;
  isChild?: boolean;
}) => {
  const allEnabledResults = getAllEnabledResultsIds(list);
  const clonedItem = deepClone(item);
  const previousItems = list.slice(0, index);
  const initialValue = clonedItem.params.in?.value;
  const prevValue = clonedItem.params.in?.prevValue;
  const lastResult = getLastResultIdFromPrimitivesList(previousItems);
  let newValue: string = lastResult;

  if (typeof initialValue !== 'string') return clonedItem;

  if (!initialValue) {
    clonedItem.params.in = {
      value: '',
    };
  }

  // SAVE
  // Value not inherited, need to keep
  if (index === 0) {
    // First primitive in list
    if (!isChild) {
      newValue = initialValue;
    }
  } else {
    // SourceGraphic || SourceAlpha
    if (isValueDefaultSource(initialValue)) {
      newValue = initialValue;
    } else {
      if (!allEnabledResults.has(initialValue)) {
        // IN is not found in available results, save it to prevValue
        // to be able to use it again if primitive with this ID will be available
        clonedItem.params.in.prevValue = initialValue;
      } else {
        newValue = initialValue;
      }
    }
  }

  // SET BACK
  // Use prev value if it is available again
  if (typeof prevValue === 'string' && allEnabledResults.has(prevValue)) {
    newValue = prevValue;
    // remove after using
    delete clonedItem.params.in.prevValue;
  }

  clonedItem.params.in.value = newValue;
  return clonedItem;
};

export default updateInPropInPrimitiveItem;
