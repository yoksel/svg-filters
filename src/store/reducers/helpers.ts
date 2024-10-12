import { PrimitiveItem, Section, SectionState } from '../types';
import deepClone from '../../helpers/deepClone';
import getLastResultIdFromPrimitivesList from './helpers/getLastResultIdFromPrimitivesList';
import idKeeper from './helpers/idKeeper';

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
  if (!idKeeper.hasSection(section)) {
    idKeeper.addSection(sectionState, section);
  }

  if (!primitive) {
    throw new Error('No primitive passed to updateUniqueProps');
  }

  const newPrimitive = deepClone(primitive);
  let newIn = getLastResultIdFromPrimitivesList(sectionState);
  let newIdAdd = newPrimitive.id;

  if (section !== 'docs') {
    newIdAdd = idKeeper.getUniqueId(newPrimitive.groupName, section);
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

