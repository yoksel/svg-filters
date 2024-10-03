import { NavLink } from 'react-router-dom';
import { primitivesAttrs } from '../../data';

import DragDropItem from '../../containers/DragDropItem';
import PrimitivePanel from '../PrimitivePanel';
import ConstructorPlaceholder from '../atoms/ConstructorPlaceholder';
import { PrimitiveItem, Section } from '../../store/types';

import './Constructor.scss';

const getResultsList = (primitives: PrimitiveItem[], index: number) => {
  return primitives.slice(0, index).map((item) => item.id);
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
      <h2 className="visuallyhidden">Constructor</h2>
      <div className="Constructor__tag Constructor__tag--open">
        &lt;filter id="#filter"&gt;
        {!primitives?.length && section !== 'playground' && (
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
            <div key={primitive.id} id={primitive.id} className="Constructor__item">
              {/* <PrimitivePanel primitive={primitive} resultsList={getResultsList(primitives, index)}>
                {primitive?.children?.map((item, childIndex) => {
                  return (
                    <div key={item.id} id={item.id} className="Constructor__item">
                      <DragDropItem
                        id={item.id}
                        parentId={primitive.id}
                        listId={primitive.id}
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
                      </DragDropItem>
                    </div>
                  );
                })}
              </PrimitivePanel> */}
            </div>
          );
        })}
      </div>

      <div className="Constructor__tag Constructor__tag--close">&lt;/filter&gt;</div>
    </section>
  );
};

export default Constructor;
