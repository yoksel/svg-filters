import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { startDrag, addDragItemToList } from '../../store/dragDropSlice';

import Placeholder from '../../components/atoms/Placeholder';
import { NativeEventCoords } from '../../store/types';

import './DragDropItem.scss';

interface Position {
  left?: number;
  width?: number | 'auto';
}

interface DragDropItemProps extends React.PropsWithChildren {
  id: string;
  index: number;
  parentId?: string;
  listId: string;
  justAdded?: boolean;
  nativeEvent?: NativeEventCoords;
}

/** Component is used to make single items draggable */
const DragDropItem = (props: DragDropItemProps) => {
  const { id, index, parentId, listId, justAdded, nativeEvent } = props;
  // from state
  const dragDropState = useSelector((state: RootState) => state.dragDrop);
  const elemClientRect = useSelector((state: RootState) => state.dragDrop.elemClientRect);
  // from state
  const lastSwapSnapshot = useSelector((state: RootState) => state.primitives.swapSnapshot);
  const currentElement = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  let coords = useRef<{ left?: number }>({});
  let leftSideCoord = useRef<number>(0);

  const isDragging = (): boolean => {
    return id === dragDropState.currentId;
  };

  const getStatus = (position: Position) => {
    let status = '';

    if (isDragging()) {
      status = 'readyToDrop';

      if (position.left && position.left < leftSideCoord.current - 100) {
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
      if (coords?.left && coords.left < leftSideCoord.current - 100) {
        width = 'auto';
      }

      position = {
        ...coords,
        width,
      };
    }

    return position;
  };

  const onMouseDown = useCallback(
    (event: { target: HTMLDivElement | null; nativeEvent: NativeEventCoords }) => {
      const { nativeEvent } = event;
      const target = event.target as HTMLElement;
      const classList = target.classList;

      if (classList.contains('DragDropItem')) {
        const { x, y, width, height } = target.getBoundingClientRect();
        const middleY = y + height / 2;

        dispatch(
          startDrag({
            id,
            index,
            parentId,
            listId,
            elemClientRect: { x, width, height },
            offset: {
              x: nativeEvent.offsetX,
              y: nativeEvent.offsetY,
              middleY: middleY,
              halfHeight: height / 2,
            },
          }),
        );
      }
    },
    [dispatch, id, index, listId, parentId],
  );

  const saveItemToList = useCallback(() => {
    if (!currentElement.current) return;

    const top = currentElement.current.offsetTop;
    const bottom = top + currentElement.current.offsetHeight;

    leftSideCoord.current = currentElement.current?.offsetLeft;

    const params = {
      id,
      parentId,
      listId,
      index,
      top,
      bottom,
    };

    dispatch(addDragItemToList(params));
  }, [dispatch, id, index, listId, parentId]);

  const moveJustAdded = useCallback(() => {
    // If element was just added with dragDrop
    if (justAdded && nativeEvent) {
      const left = nativeEvent.offsetX;

      coords.current = {
        left: left,
      };

      // Force moving duplicated element to cursor,
      // initiate startDrag
      onMouseDown({
        target: currentElement.current,
        nativeEvent,
      });
    }
  }, [justAdded, nativeEvent, onMouseDown]);

  useEffect(() => {
    saveItemToList();
    moveJustAdded();
  }, [saveItemToList, moveJustAdded, lastSwapSnapshot]);

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

      <Placeholder isDragging={isDragging()} elemClientRect={elemClientRect} />
    </div>
  );
};

export default DragDropItem;
