import { useSelector } from 'react-redux';

import ControlsList from '../../components/ControlsList';
import { RootState } from '../../store/store';

const PresetsList = () => {
  const presetControls = useSelector((state: RootState) => state.data.presets);

  if (!presetControls?.length) return null;

  return <ControlsList items={presetControls} control="NavLink" />;
};

export default PresetsList;
