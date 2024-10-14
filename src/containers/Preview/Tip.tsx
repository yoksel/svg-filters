import { Section } from '../../store/types';

const Tip = ({
  noContent,
  noFilter,
  section,
  onClick,
}: {
  noContent?: boolean;
  noFilter?: boolean;
  section: Section;
  onClick: () => void;
}) => {
  if (noContent) {
    return (
      <button className="Preview__tip Preview__tip--add-svg-content" onClick={onClick}>
        Add some SVG
      </button>
    );
  }

  if (noFilter) {
    return (
      <div className="Preview__tip Preview__tip--add-primitives">
        Choose a {section === 'presets' ? 'preset' : 'primitive'} from the left column
      </div>
    );
  }

  return null;
};

export default Tip;
