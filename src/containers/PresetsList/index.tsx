import { useSelector } from 'react-redux';

import ControlsList from '../../components/molecules/ControlsList';
import { RootState } from '../../store/store';

/** List of presets controls for the left column in Presets section */
const PresetsList = () => {
  const presetControls = useSelector((state: RootState) => state.data.presets);

  if (!presetControls?.length) return null;

  return <ControlsList items={presetControls} control="NavLink" />;
};

export default PresetsList;
