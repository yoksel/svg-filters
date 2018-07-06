import {connect} from 'react-redux';
import ConstructorTemplate from '../../components/Constructor';

const mapStateToProps = (state) => {
  return {
    primitives: state.primitives
  };
};

const Constructor = connect(
  mapStateToProps,
  null
)(ConstructorTemplate);

export default Constructor;
