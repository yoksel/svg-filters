import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {updateSvg} from '../../store/actions';

import SvgCodeTemplate from '../../components/SvgCode';

const mapStateToProps = (state, {match}) => {
  const {section = 'playground'} = match.params;

  return {
    filterId: state.primitives[section].length ? 'filter' : '',
    value: state.playground.svgCode
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    onChange: (value) => {
      dispatch(updateSvg({value}));
    },
    addExample: (content) => {
      dispatch(updateSvg({
        value: content
      }));
    }
  };
};

const SvgCode = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(SvgCodeTemplate));

export default SvgCode;
