import {connect} from 'react-redux';

import PlaygroundTemplate from '../../components/Playground';

const mapStateToProps = (state) => {
  return {
    filterId: state.primitives.length ? 'filter' : ''
  };
};

const Playground = connect(
  mapStateToProps,
  null
)(PlaygroundTemplate);


export default Playground;
