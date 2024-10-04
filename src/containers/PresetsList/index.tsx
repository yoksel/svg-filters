import { useSelector } from 'react-redux';
import withRouter from '../../helpers/withRouter';

import ControlsList from '../../components/ControlsList';
import { RootState } from '../../store';

const PresetsList = () => {
  const presetControls = useSelector((state: RootState) => state.data.presets);

  if (!presetControls?.length) return null;

  return <ControlsList items={presetControls} control="NavLink" />;
};

export default withRouter(PresetsList);
