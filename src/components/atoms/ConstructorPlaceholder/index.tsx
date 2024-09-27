import { Section } from '../../../store/types';

import './ConstructorPlaceholder.scss';

const text: { [key in Section]: string | null } = {
  playground: 'Drag primitives here to create filter',
  presets: 'Choose a preset to play with its primitives',
  docs: 'Choose primitive to see docs and live demos',
  read: null, // should be excluded
};

const ConstructorPlaceholder = ({ section }: { section: Section }) => {
  const textBySection = text[section];
  if (!textBySection) return null;

  return (
    <div
      className="ConstructorPlaceholder"
      dangerouslySetInnerHTML={{ __html: textBySection }}
    ></div>
  );
};

export default ConstructorPlaceholder;
