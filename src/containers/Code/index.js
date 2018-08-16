import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import CodeTemplate from '../../components/Code';

const mapStateToProps = (state, {match}) => {
  const {section = 'playground'} = match.params;

  return {
    primitives: state.primitives[section],
    filterData: state.primitives.filter
  };
};

const Code = withRouter(connect(
  mapStateToProps,
  null
)(CodeTemplate));

export default Code;
