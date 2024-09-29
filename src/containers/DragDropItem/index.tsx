import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { startDrag, addDragItemToList } from '../../store/dragDropSlice';

// import {startDrag} from '../../store/actions';

import Placeholder from '../../components/atoms/Placeholder';

import './DragDropItem.scss';
import { NativeEventCoords } from '../../store/types';
import clsx from 'clsx';

interface Position {
  left?: number;
  width?: number | 'auto';
}

interface DragDropItemProps extends React.PropsWithChildren {
  id: string;
  index: number;
  parentId: string;
  listId: string;
  justAdded?: boolean;
  nativeEvent?: NativeEventCoords;
}

const DragDropItem = (props: DragDropItemProps) => {
  // from state
  const dragDropState = useSelector((state: RootState) => state.dragDrop);
  // from state
  const lastSwapSnapshot = useSelector((state: RootState) => state.primitives.swapSnapshot);
  const currentElement = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  let coords = {};
  let leftSideCoord = 0;

  const isDragging = (): boolean => {
    const { id } = props;
    return dragDropState && id === dragDropState.id;
  };

  const getStatus = (position: Position) => {
    let status = '';

    if (isDragging()) {
      status = 'readyToDrop';

      if (position.left && position.left < leftSideCoord - 100) {
        status = 'notOVerlapTarget';
      }
    }

    return status;
  };

  const getPosition = (): Position => {
    let position: Position = {};

    if (isDragging()) {
      let coords = dragDropState.coords;
      let width = dragDropState.elemClientRect?.width;
      if (coords?.left && coords.left < leftSideCoord - 100) {
        width = 'auto';
      }

      position = {
        ...coords,
        width,
      };
    }

    return position;
  };

  const onMouseDown = (event: {
    target: HTMLDivElement | null;
    nativeEvent: NativeEventCoords;
  }) => {
    const { nativeEvent } = event;
    const target = event.target as HTMLElement;
    const classList = target.classList;

    if (classList.contains('DragDropItem')) {
      const elemClientRect = target.getBoundingClientRect();
      const middleY = elemClientRect.y + elemClientRect.height / 2;

      dispatch(
        startDrag({
          id: props.id,
          index: props.index,
          parentId: props.parentId,
          listId: props.listId,
          elemClientRect: elemClientRect,
          offset: {
            x: nativeEvent.offsetX,
            y: nativeEvent.offsetY,
            middleY: middleY,
            halfHeight: elemClientRect.height / 2,
          },
        }),
      );
    }
  };

  const saveItemToList = () => {
    if (!currentElement.current) return;

    const top = currentElement.current.offsetTop;
    const bottom = top + currentElement.current.offsetHeight;
    const { id, index, parentId, listId } = props;
    leftSideCoord = currentElement.current?.offsetLeft;

    const params = {
      id,
      parentId,
      listId,
      index,
      top,
      bottom,
    };

    dispatch(addDragItemToList(params));
  };

  const moveJustAdded = () => {
    const { justAdded, nativeEvent } = props;

    // If element was just added with dragDrop
    if (justAdded && nativeEvent) {
      const left = nativeEvent.offsetX;

      coords = {
        left: left,
      };

      // Force moving duplicated element to cursor,
      // initiate startDrag
      onMouseDown({
        target: currentElement.current,
        nativeEvent,
      });
    }
  };

  // saveItemToList();
  // moveJustAdded();

  const position = getPosition();
  const status = getStatus(position);

  return (
    <div
      className={clsx(
        'DragDropItem',
        isDragging() && 'DragDropItem--dragging',
        status && `DragDropItem--status-${status}`,
      )}
      onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
        onMouseDown({
          target: event.target as HTMLDivElement,
          nativeEvent: event.nativeEvent,
        });
      }}
      ref={currentElement}
    >
      <div style={position} className="DragDropItem__container">
        {props.children}
      </div>

      <Placeholder isDragging={isDragging()} elemClientRect={dragDropState.elemClientRect} />
    </div>
  );
};

export default DragDropItem;
