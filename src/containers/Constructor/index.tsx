import { useDispatch, useSelector } from 'react-redux';
import { primitivesAttrs } from '../../data';

import useSection from '../../hooks/useSection';
import { RootState } from '../../store/store';
import { moveToPlayground, purgePrimitives } from '../../store/primitivesSlice';
import { isPrimitivesSection, PrimitiveItem } from '../../store/types';
import { defaultSources } from '../../store/reducers/helpers/updateInPropInPrimitiveItem';

import Constructor from '../../components/molecules/Constructor';
import ConstructorPlaceholder from '../../components/atoms/ConstructorPlaceholder';
import ConstructorItem from '../ConstructorItem';
import PrimitivePanel from '../PrimitivePanel';

const ConstructorContainer = () => {
  const { section } = useSection();
  const primitives = useSelector((state: RootState) => {
    if (!isPrimitivesSection(section)) return;
    return state.primitives.sections[section];
  });
  const dispatch = useDispatch();
  if (!isPrimitivesSection(section)) return null;

  const getResultsList = (primitives: PrimitiveItem[], index: number) => {
    const results = primitives.slice(0, index).map((item) => item.id);
    return Object.keys(defaultSources).concat(results);
  };

  return (
    <Constructor
      section={section}
      primitives={primitives || undefined}
      purgePrimitives={() => dispatch(purgePrimitives({ section }))}
      moveToPlayground={() => dispatch(moveToPlayground({ section }))}
    >
      {!primitives?.length && <ConstructorPlaceholder section={section} />}
      {primitives?.map((primitive: PrimitiveItem, index: number) => {
        const groupData = primitivesAttrs[primitive.groupName];

        return (
          <ConstructorItem
            key={primitive.id}
            id={primitive.id}
            listId="primitives"
            index={index}
            justAdded={primitive.justAdded}
            nativeEvent={primitive.nativeEvent || undefined}
          >
            <PrimitivePanel primitive={primitive} resultsList={getResultsList(primitives, index)}>
              {primitive?.children?.map((item, childIndex) => {
                return (
                  <ConstructorItem
                    key={item.id}
                    id={item.id}
                    listId={primitive.id}
                    parentId={primitive.id}
                    index={childIndex}
                    justAdded={item.justAdded}
                    nativeEvent={item.nativeEvent || undefined}
                  >
                    <PrimitivePanel
                      parentId={primitive.id}
                      primitive={item}
                      resultsList={getResultsList(primitives, index)}
                      parentHasSingleChild={groupData.hasSingleChild}
                      noChangesForChildren={groupData.noChangesForChildren}
                    />
                  </ConstructorItem>
                );
              })}
            </PrimitivePanel>
          </ConstructorItem>
        );
      })}
    </Constructor>
  );
};

export default ConstructorContainer;
