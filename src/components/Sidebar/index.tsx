import useSection from '../../hooks/useSection';

import PrimitiveControlsList from '../../containers/PrimitiveControlsList';
import PresetsList from '../../containers/PresetsList';

const Sidebar = () => {
  const { section } = useSection();

  if (section === 'presets') {
    return <PresetsList />;
  }

  return <PrimitiveControlsList />;
};

export default Sidebar;
