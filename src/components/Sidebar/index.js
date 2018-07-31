import React from 'react';

import PrimitiveControlsList from '../../containers/PrimitiveControlsList';
import PresetsList from '../../containers/PresetsList';
import Tabs from '../../containers/Tabs';

const Sidebar = ({match}) => {
  return (
    <Tabs
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

export default Sidebar;
