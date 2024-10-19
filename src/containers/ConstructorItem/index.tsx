import DragDropItem from '../DragDropItem';
import { NativeEventCoords } from '../../store/types';
import './ConstructorItem.scss';

interface ConstructorItemProps extends React.PropsWithChildren {
  id: string;
  parentId?: string;
  listId: string;
  index: number;
  justAdded?: boolean;
  nativeEvent?: NativeEventCoords;
}

const ConstructorItem = ({
  children,
  id,
  parentId,
  listId,
  index,
  justAdded,
  nativeEvent,
}: ConstructorItemProps) => {
  return (
    <div id={id} className="ConstructorItem">
      <DragDropItem
        id={id}
        parentId={parentId}
        listId={listId}
        index={index}
        justAdded={justAdded}
        nativeEvent={nativeEvent || undefined}
      >
        {children}
      </DragDropItem>
    </div>
  );
};

export default ConstructorItem;
