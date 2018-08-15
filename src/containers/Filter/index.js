import {connect} from 'react-redux';
import FilterTemplate from '../../components/Filter';

const mapStateToProps = (state) => {
  return {
    primitives: state.primitives.list,
    filterData: state.primitives.filter
  };
};

const Filter = connect(
  mapStateToProps,
  null
)(FilterTemplate);

export default Filter;
