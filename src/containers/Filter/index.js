import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import FilterTemplate from '../../components/Filter';

const mapStateToProps = (state, {match}) => {
  const {section = 'playground'} = match.params;

  const filterData = state.primitives.filter;

  if (filterData.style) {
    delete filterData.style;
  }

  return {
    primitives: state.primitives[section],
    filterData
  };
};

const Filter = withRouter(connect(
  mapStateToProps,
  null
)(FilterTemplate));

export default Filter;
