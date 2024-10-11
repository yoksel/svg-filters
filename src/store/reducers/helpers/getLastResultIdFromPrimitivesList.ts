import { SectionState } from '../../types';

const getLastResultIdFromPrimitivesList = (state: SectionState) => {
  let result = 'SourceGraphic';
  const availableItems = state?.filter((item) => !item.disabled);
  const last = availableItems?.[availableItems.length - 1];

  return last?.id || result;
};

export default getLastResultIdFromPrimitivesList;
