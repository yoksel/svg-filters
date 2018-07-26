import React from 'react';
import PropTypes from 'prop-types';

import deepClone from '../../helpers/deepClone';

import Placeholder from '../Placeholder';
import PrimitivePanel from '../../containers/PrimitivePanel';

import './Constructor.css';

const getResultsList = (primitives, index) => {
  return primitives.slice(0, index)
    .map(item => item.id);
};

const Contsructor = ({primitives, dragDrop}) => {
  let items = {
    main: []
  };

  const getSiblingsCoords = ({id, parentId = 'main'}) => {
    const list = items[parentId].filter(item => item);

    const itemsCoords = list.map((item, index) => {
      const {top, bottom} = item.getBoundingClientRect();
      const itemId = item.id;

      return {
        id: itemId,
        index,
        top,
        bottom
      };
    });
    return itemsCoords;
  };

  const getPosition = (id) => {
    const isDragging = dragDrop && id === dragDrop.id;
    let position = {};

    if (isDragging) {
      position = {
        ...dragDrop.coords,
        position: 'fixed',
        zIndex: 10,
        width: dragDrop.elemClientRect.width
      };
    }

    return position;
  };

  return (
    <div className="Contsructor">
      &lt;filter id="#filter">
      <div className="Contsructor__container">
        {primitives.map((primitive, index) => {
          const isDragging = dragDrop && primitive.id === dragDrop.id;
          let position = getPosition(primitive.id);

          if (primitive.children && primitive.children.length > 0) {
            primitive = deepClone(primitive);
            items[primitive.id] = [];

            primitive.children = primitive.children.map((item, childIndex) => {
              let childPosition = getPosition(item.id);
              const isChildDragging = item.id === dragDrop.id;

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="Contsructor__item"
                  ref={node => items[primitive.id].push(node)}
                >
                  <div
                    className="Contsructor__item-container"
                    style={childPosition}
                  >
                    <PrimitivePanel
                      index={childIndex}
                      parentId={primitive.id}
                      primitive={item}
                      resultsList={getResultsList(primitives, index)}
                      getSiblingsCoords={getSiblingsCoords}
                    />
                  </div>

                  <Placeholder
                    isDragging={isChildDragging}
                    elemClientRect={dragDrop.elemClientRect}/>
                </div>
              );
            });
          }

          return (
            <div
              key={primitive.id}
              id={primitive.id}
              className="Contsructor__item"
              ref={node => items.main.push(node)}
            >
              <div
                className="Contsructor__item-container"
                style={position}
              >
                <PrimitivePanel
                  index={index}
                  primitive={primitive}
                  resultsList={getResultsList(primitives, index)}
                  getSiblingsCoords={getSiblingsCoords}
                />
              </div>

              <Placeholder
                isDragging={isDragging}
                elemClientRect={dragDrop.elemClientRect}/>
            </div>
          );
        })}
      </div>

      &lt;/filter>
    </div>
  );
};

export default Contsructor;

Contsructor.propTypes = {
  primitives: PropTypes.array.isRequired
};
