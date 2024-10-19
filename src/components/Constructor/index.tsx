import { NavLink } from 'react-router-dom';
import { primitivesAttrs } from '../../data';

import PrimitivePanel from '../../containers/PrimitivePanel';
import ConstructorPlaceholder from '../atoms/ConstructorPlaceholder';
import { PrimitiveItem, Section } from '../../store/types';
import { defaultSources } from '../../store/reducers/helpers/updateInPropInPrimitiveItem';
import ConstructorItem from '../../containers/ConstructorItem';

import './Constructor.scss';

const getResultsList = (primitives: PrimitiveItem[], index: number) => {
  const results = primitives.slice(0, index).map((item) => item.id);
  return Object.keys(defaultSources).concat(results);
};

const getMoveToPlaygroundButton = (
  section: Section,
  moveToPlayground: () => void,
  count?: number,
) => {
  if (section === 'playground' || count === 0) {
    return null;
  }

  return (
    <span>
      <NavLink
        className="Constructor__button Constructor__button--move"
        to="/"
        onClick={moveToPlayground}
      >
        Move to playground
      </NavLink>
    </span>
  );
};

interface ConstructorProps {
  primitives?: PrimitiveItem[];
  purgePrimitives: () => void;
  moveToPlayground: () => void;
  section: Section;
}

const Constructor = ({
  primitives,
  purgePrimitives,
  moveToPlayground,
  section,
}: ConstructorProps) => {
  return (
    <section className="Constructor">
      <h2 className="visually-hidden">Constructor</h2>
      <div className="Constructor__tag Constructor__tag--open">
        &lt;filter id="#filter"&gt;
        {Boolean(primitives?.length) && section === 'playground' && (
          <button
            className="Constructor__button Constructor__button--purge"
            onClick={purgePrimitives}
          >
            Clear
          </button>
        )}
        {getMoveToPlaygroundButton(section, moveToPlayground, primitives?.length)}
      </div>
      <div className="Constructor__container">
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
      </div>

      <div className="Constructor__tag Constructor__tag--close">&lt;/filter&gt;</div>
    </section>
  );
};

export default Constructor;
