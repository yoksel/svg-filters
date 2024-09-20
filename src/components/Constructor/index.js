import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import deepClone from '../../helpers/deepClone';

import {primitivesAttrs} from '../../data';

import DragDropItem from '../../containers/DragDropItem';
import PrimitivePanel from '../PrimitivePanel';
import ConstructorPlaceholder from '../atoms/ConstructorPlaceholder';

import './Constructor.scss';

const getResultsList = (primitives, index) => {
  return primitives.slice(0, index)
    .map(item => item.id);
};

const getPurgeButton = (section, purgePrimitives, count) => {
  if (section !== 'playground' || count === 0) {
    return null;
  }

  return (
    <button
      className="Constructor__button Constructor__button--purge"
      onClick={purgePrimitives}
    >Clear</button>
  );
};

const getMoveToPlaygroundButton = (section, moveToPlayground, count) => {
  if (section === 'playground' || count === 0) {
    return null;
  }

  return (
    <span>
      <NavLink
        className="Constructor__button Constructor__button--move"
        to="/"
        onClick={moveToPlayground}
      >Move to playground</NavLink>
    </span>
  );
};

const Constructor = ({
  primitives,
  purgePrimitives,
  moveToPlayground,
  section
}) => {
  return (
    <section className="Constructor">
      <h2 className="visuallyhidden">Constructor</h2>
      <div className="Constructor__tag Constructor__tag--open">
        &lt;filter id="#filter">
        {getPurgeButton(section, purgePrimitives, primitives.length)}
        {getMoveToPlaygroundButton(section, moveToPlayground, primitives.length)}
      </div>
      <div
        className="Constructor__container">
        {!primitives.length && <ConstructorPlaceholder section={section}/>}

        {primitives.map((primitive, index) => {
          const groupData = primitivesAttrs[primitive.groupName];

          if (primitive.children && primitive.children.length > 0) {
            primitive = deepClone(primitive);

            primitive.children = primitive.children.map((item, childIndex) => {
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="Constructor__item"
                >
                  <DragDropItem
                    id={item.id}
                    parentId={primitive.id}
                    listId={primitive.id}
                    index={childIndex}
                    justAdded={item.justAdded}
                    nativeEvent={item.nativeEvent}
                  >
                    <PrimitivePanel
                      index={childIndex}
                      parentId={primitive.id}
                      primitive={item}
                      resultsList={getResultsList(primitives, index)}
                      parentHasSingleChild={groupData.hasSingleChild}
                      noChangesForChildren={groupData.noChangesForChildren}
                    />
                  </DragDropItem>
                </div>
              );
            });
          }

          return (
            <div
              key={primitive.id}
              id={primitive.id}
              className="Constructor__item"
            >
              <DragDropItem
                id={primitive.id}
                listId="primitives"
                index={index}
                justAdded={primitive.justAdded}
                nativeEvent={primitive.nativeEvent}
              >
                <PrimitivePanel
                  index={index}
                  primitive={primitive}
                  resultsList={getResultsList(primitives, index)}
                />
              </DragDropItem>
            </div>
          );
        })}
      </div>

      <div className="Constructor__tag Constructor__tag--close">&lt;/filter&gt;</div>
    </section>
  );
};

export default Constructor;

Constructor.propTypes = {
  primitives: PropTypes.array,
  purgePrimitives: PropTypes.func,
  moveToPlayground: PropTypes.func,
  section: PropTypes.string,
};
