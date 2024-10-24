import { PrimitiveItem, Section, SectionState } from '../../types';
import deepClone from '../../../helpers/deepClone';
import getLastResultIdFromPrimitivesList from './getLastResultIdFromPrimitivesList';
import idKeeper from './idKeeper';

export interface UpdateUniquePropsArgs {
  sectionState: SectionState;
  primitive: PrimitiveItem;
  section: Section;
  isDuplication?: boolean;
}

// Update props which should be unique for newly added primitive
// before adding to primitives list in section
export const updateUniqueProps = ({
  sectionState,
  primitive,
  section,
  isDuplication,
}: UpdateUniquePropsArgs) => {
  if (!idKeeper.hasSection(section)) {
    idKeeper.addSection(sectionState, section);
  }

  if (!primitive) {
    throw new Error('No primitive passed to updateUniqueProps');
  }

  const newPrimitive = deepClone(primitive);
  let newId =
    section === 'docs' ? newPrimitive.id : idKeeper.getUniqueId(newPrimitive.groupName, section);

  newPrimitive.id = newId;

  if (newPrimitive.params) {
    if (newPrimitive.params.result) {
      newPrimitive.params.result.value = newId;
    }

    if (!isDuplication && section !== 'docs') {
      let newIn = getLastResultIdFromPrimitivesList(sectionState);

      if (newPrimitive.params.in2) {
        // In and In2
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
        isDuplication,
      });
    });
  }

  return newPrimitive;
};
