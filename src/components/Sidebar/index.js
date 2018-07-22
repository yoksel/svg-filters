import React from 'react';
import {withRouter} from 'react-router';

import PrimitiveControlsList from '../../containers/PrimitiveControlsList';
import PresetsList from '../../containers/PresetsList';
import Tabs from '../Tabs';

const Sidebar = ({match}) => {
  const {sidebarList} = match.params;

  return (
    <Tabs
      currentTab = {sidebarList === 'presets' ? 'presets' : 'primitives'}
      items={[
        {
          id: 'primitives',
          name: 'Primitives',
          content: PrimitiveControlsList
        },
        {
          id: 'presets',
          name: 'Presets',
          content: PresetsList
        }
      ]}
    />
  );
};

export default withRouter(Sidebar);
