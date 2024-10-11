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
  console.log(1);
  const clonedItem = deepClone(item);
  console.log(2);
  console.log({ list, index });
  const previousItems = list.slice(0, index);
  console.log(3);
  console.log(clonedItem.params);
  const initialValue = clonedItem.params.in?.value;
  console.log(4);
  const prevValue = clonedItem.params.in?.prevValue;
  const lastResult = getLastResultIdFromPrimitivesList(previousItems);
  let newValue: string = lastResult;

  if (typeof initialValue !== 'string') return clonedItem;

  if (!initialValue) {
    clonedItem.params.in = {
      value: '',
    };
  }
  console.log({ initialValue, prevValue, lastResult });

  // SAVE
  // Value not inherited, need to keep
  if (index === 0) {
    // First primitive in list
    if (!isChild) {
      console.log('* First item, no children');
      newValue = initialValue;
    }
  } else {
    // SourceGraphic || SourceAlpha
    if (isValueDefaultSource(initialValue)) {
      console.log('* InitialValue is default source');
      newValue = initialValue;
    } else {
      if (!allEnabledResults.has(initialValue)) {
        // IN is not found in available results
        console.log('* IN is not found in available results');
        clonedItem.params.in.prevValue = initialValue;
      } else {
        newValue = initialValue;
      }
    }
  }

  // SET BACK
  // Use prev value if it is available
  if (typeof prevValue === 'string' && allEnabledResults.has(initialValue)) {
    newValue = prevValue;
    delete clonedItem.params.in.prevValue;
  }

  clonedItem.params.in.value = newValue;
  return clonedItem;
};

export default updateInPropInPrimitiveItem;
