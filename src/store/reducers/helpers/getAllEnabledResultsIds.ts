import { SectionState } from '../../types';

const getAllEnabledResultsIds = (state?: SectionState): Set<string> => {
  const idSet = new Set<string>();

  const results = state?.filter((item) => !item.disabled);

  results?.forEach((item) => idSet.add(item.id));

  return idSet;
};

export default getAllEnabledResultsIds;
