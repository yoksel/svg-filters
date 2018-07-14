import {connect} from 'react-redux';

import {setVisibilityFilter} from '../../store/actions';

import Button from '../../components/Button';

const mapStateToFilterButtonProps = (state, ownProps) => {
  return {
    isActive: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToFilterButtonProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const FilterButton = connect(
  mapStateToFilterButtonProps,
  mapDispatchToFilterButtonProps
)(Button);

export default FilterButton;

