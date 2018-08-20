import {connect} from 'react-redux';

import PrimitivePanelSwitcherTemplate from '../../components/PrimitivePanelSwitcher';

const mapStateToProps = (state) => {
  return {
    data: state.PrimitivePanelSwitcher
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    onClick: (data) => {
      dispatch({
        type: 'DO_SOMETHING',
        id: data.id
      });
    }
  };
};

const PrimitivePanelSwitcher = connect(
  mapStateToProps,
  mapDispatchProps
)(PrimitivePanelSwitcherTemplate);

export default PrimitivePanelSwitcher;
