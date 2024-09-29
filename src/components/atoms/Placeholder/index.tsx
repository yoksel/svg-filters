import { DragClientRect } from '../../../store/types';

import './Placeholder.scss';

interface PlaceholderProps {
  elemClientRect?: DragClientRect;
  isDragging: boolean;
}

const Placeholder = ({ elemClientRect, isDragging }: PlaceholderProps) => {
  if (!isDragging || !elemClientRect) {
    return null;
  }

  return <div className="Placeholder" style={{ height: elemClientRect.height }}></div>;
};

export default Placeholder;
