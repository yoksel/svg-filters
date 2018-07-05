import React, { Component } from 'react';

import FilterButton from '../../containers/FilterButton';

class FilterControls extends Component {
  render() {
    const filters = [
      ['SHOW_ALL', 'All'],
      ['SHOW_ACTIVE', 'Active'],
      ['SHOW_COMPLETED', 'Completed']
    ];

    return filters.map(filter => {
      return (
        <FilterButton
          key={filter}
          filter={filter[0]}
        >
          {filter[1]}
        </FilterButton>
      );
    })
  }
}

export default FilterControls;
