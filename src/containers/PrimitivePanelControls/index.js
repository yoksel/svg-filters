import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {deletePrimitive, duplicatePrimitive, togglePrimitive, toggleDocs, updateIns} from '../../store/actions';

import PrimitivePanelControlsTemplate from '../../components/PrimitivePanelControls';

const mapDispatchProps = (
  dispatch,
  {id, parentId, match}
) => {
  const {section = 'playground'} = match.params;
  let params = {
    id: id
  };

  if (parentId) {
    params = {
      id: parentId,
      childId: id
    };
  }

  params.section = section;

  return {
    removePrimitive: () => {
      dispatch(deletePrimitive(params));
      dispatch(updateIns({section}));
    },
    duplicatePrimitive: () => {
      dispatch(duplicatePrimitive(params));
    },
    togglePrimitive: () => {
      dispatch(togglePrimitive(params));
      dispatch(updateIns({section}));
    },
    toggleDocs: () => {
      dispatch(toggleDocs(params));
    }
  };
};

const PrimitivePanelControls = withRouter(connect(
  null,
  mapDispatchProps
)(PrimitivePanelControlsTemplate));

export default PrimitivePanelControls;
