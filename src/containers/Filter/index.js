import {connect} from 'react-redux';
import FilterTemplate from '../../components/Filter';

const mapStateToProps = (state) => {
  return {
    primitives: state.primitives.list
  };
};

const Filter = connect(
  mapStateToProps,
  null
)(FilterTemplate);

export default Filter;
