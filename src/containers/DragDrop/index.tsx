import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import useSection from '../../hooks/useSection';
import { moveDrag, stopDrag } from '../../store/dragDropSlice';
import { swapPrimitives, switchOffLastAdded } from '../../store/primitivesSlice';
import { BaseCoords, isPrimitivesSection } from '../../store/types';

interface SwapItemsData {
  indexes: { from: number; to: number };
  swapSnapshot: string;
  parentId?: string;
}

interface DragDropProps extends React.PropsWithChildren {
  listId: string;
}

/** Component handles logic for dragging items to Constructor & inside it. */
const DragDrop = ({ children, listId }: DragDropProps) => {
  const dragDrop = useSelector((state: RootState) => state.dragDrop);
  const isDragging = useSelector((state: RootState) => Boolean(state.dragDrop.currentId));
  const lastSwapSnapshot = useSelector((state: RootState) => state.primitives.swapSnapshot);
  const { section } = useSection();
  const dispatch = useDispatch();

  const onMoveDrag = (coords: BaseCoords) => {
    dispatch(moveDrag({ coords }));
  };

  const onSwap = (swapItemsData: SwapItemsData) => {
    if (!swapItemsData || !isPrimitivesSection(section)) {
      return;
    }

    const newIndex = swapItemsData.indexes.to;

    dispatch(
      swapPrimitives({
        ...swapItemsData,
        section,
      }),
    );
    dispatch({
      type: 'UDPATE_DRAG_INDEX',
      index: newIndex,
    });
  };

  const onStopDrag = (id: string) => {
    if (!isPrimitivesSection(section)) return;

    dispatch(stopDrag());
    dispatch(switchOffLastAdded({ id, section }));
  };

  const onMouseUp = () => {
    if (!isDragging || !dragDrop.currentId) {
      return null;
    }

    onStopDrag(dragDrop.currentId);
  };

  const getItemsToSwap = (top: number): SwapItemsData | null => {
    const { currentId, parentId, index, siblingsCoords, offset } = dragDrop;
    const siblingsCoordsObj = siblingsCoords?.[dragDrop.listId || listId];

    if (!siblingsCoordsObj || !offset || !index) return null;

    const siblingsCoord = Object.values(siblingsCoordsObj);
    const middleY = top + offset.halfHeight;

    const intersections = siblingsCoord.filter((item) => {
      if (item.id === currentId) {
        // Need to keep all items to get right index
        // and remove dragging one just for measures
        return false;
      }
      if (!item.top || !item.bottom) return false;

      // Check intersection with the middle of dragging item
      return middleY > item.top && middleY < item.bottom;
    });

    if (!intersections.length) {
      return null;
    }

    const foundedIntersection = intersections[0];

    const indexes = {
      from: index,
      to: foundedIntersection.index,
    };

    const swapSnapshot = [
      `${currentId}-${index}`,
      `${foundedIntersection.id}-${foundedIntersection.index}`,
    ].join();

    if (swapSnapshot === lastSwapSnapshot) {
      return null;
    }

    return {
      parentId,
      indexes,
      swapSnapshot,
    };
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !dragDrop?.offset) {
      return null;
    }

    const top = event.nativeEvent.pageY - dragDrop.offset.y;
    const left = event.nativeEvent.pageX - dragDrop.offset.x;
    const swapItemsData = getItemsToSwap(top);

    onMoveDrag({
      top,
      left,
    });

    if (swapItemsData) {
      onSwap(swapItemsData);
    }
  };

  return (
    <div className="dragDrop" onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
      {children}
    </div>
  );
};

export default DragDrop;
