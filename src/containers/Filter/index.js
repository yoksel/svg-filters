import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import FilterTemplate from '../../components/Filter';

const mapStateToProps = (state, {match}) => {
  const {section = 'playground'} = match.params;

  return {
    primitives: state.primitives[section],
    filterData: state.primitives.filter
  };
};

const Filter = withRouter(connect(
  mapStateToProps,
  null
)(FilterTemplate));

export default Filter;
