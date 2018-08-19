import React from 'react';
import PropTypes from 'prop-types';

import deepClone from '../../helpers/deepClone';

import DragDropItem from '../../containers/DragDropItem';
import PrimitivePanel from '../PrimitivePanel';
import ConstructorPlaceholder from '../ConstructorPlaceholder';

import './Constructor.css';

const getResultsList = (primitives, index) => {
  return primitives.slice(0, index)
    .map(item => item.id);
};

const getPurgeButton = (section, purgePrimitives) => {
  if (section !== 'playground') {
    return null;
  }

  return (
    <button
      className="Constructor__purge-button"
      onClick={purgePrimitives}
    >Clear</button>
  );
};

const Constructor = ({primitives, dragDrop, purgePrimitives, section}) => {
  return (
    <div className="Constructor">
      <div className="Constructor__tag Constructor__tag--open">
        &lt;filter id="#filter">
        {getPurgeButton(section, purgePrimitives)}
      </div>
      <div
        className="Constructor__container">
        {!primitives.length && <ConstructorPlaceholder section={section}/>}

        {primitives.map((primitive, index) => {

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

      <div className="Constructor__tag Constructor__tag--close">&lt;/filter></div>
    </div>
  );
};

export default Constructor;

Constructor.propTypes = {
  primitives: PropTypes.array.isRequired
};
