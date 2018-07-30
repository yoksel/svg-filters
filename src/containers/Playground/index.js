import {connect} from 'react-redux';

import PlaygroundTemplate from '../../components/Playground';

const mapStateToProps = (state) => {
  return {
    filterId: state.primitives.list.length ? 'filter' : ''
  };
};

const Playground = connect(
  mapStateToProps,
  null
)(PlaygroundTemplate);


export default Playground;
