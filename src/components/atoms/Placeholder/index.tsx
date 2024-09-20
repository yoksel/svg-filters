import './Placeholder.scss';

interface PlaceholderProps {
  elemClientRect: {height: string};
  isDragging: boolean;
}

const Placeholder = ({elemClientRect, isDragging}: PlaceholderProps) => {
  if (!isDragging) {
    return null;
  }

  return (
    <div
      className="Placeholder"
      style={{height: elemClientRect.height}}
    ></div>
  );
};

export default Placeholder;
