import {connect} from 'react-redux';
import CodeTemplate from '../../components/Code';

const mapStateToProps = (state) => {
  return {
    primitives: state.primitives.list,
    filterData: state.primitives.filter
  };
};

const Code = connect(
  mapStateToProps,
  null
)(CodeTemplate);

export default Code;
