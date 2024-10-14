import useSection from '../../hooks/useSection';

import PrimitiveControlsList from '../PrimitiveControlsList';
import PresetsList from '../PresetsList';

/** Page sidebar with lists primitives/presets/docs controls */
const Sidebar = () => {
  const { section } = useSection();

  if (section === 'presets') {
    return <PresetsList />;
  }

  return <PrimitiveControlsList />;
};

export default Sidebar;
