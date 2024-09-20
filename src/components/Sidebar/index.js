import React from 'react';
import withRouter from '../../helpers/withRouter';

import PrimitiveControlsList from '../../containers/PrimitiveControlsList';
import PresetsList from '../../containers/PresetsList';

const Sidebar = ({match}) => {
  const {section} = match?.params || {};

  if (section === 'presets') {
    return <PresetsList/>;
  }

  return <PrimitiveControlsList/>;
};

export default withRouter(Sidebar);
