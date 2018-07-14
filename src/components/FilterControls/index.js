import React, {Component} from 'react';

import FilterButton from '../../containers/FilterButton';
import FilterLink from '../../containers/FilterLink';

import './FilterControls.css';

class FilterControls extends Component {
  render() {
    const filters = [
      ['SHOW_ALL', 'All'],
      ['SHOW_ACTIVE', 'Active'],
      ['SHOW_COMPLETED', 'Completed']
    ];

    const controls = filters.map(filter => {
      return (
        <FilterLink
          key={filter}
          filter={filter[0]}
        >
          {filter[1]}
        </FilterLink>
      );
    });

    return (
      <div className="FilterControls">
        {controls}
      </div>
    );
  }
}

export default FilterControls;
