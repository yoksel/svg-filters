import {connect} from 'react-redux';

import Button from '../../components/Button';

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  }
};

const mapStateToFilterButtonProps = (state, ownProps ) => {
  return {
    isActive: ownProps.filter === state.visibilityFilter
  }
};

const mapDispatchToFilterButtonProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  }
}

const FilterButton = connect(
  mapStateToFilterButtonProps,
  mapDispatchToFilterButtonProps
)(Button);

export default FilterButton;

