import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import DocsTemplate from '../../components/Docs';

const mapStateToProps = (state,{match}) => {
  const {section, id} = match.params;
  let docId;
  if (section === 'docs' && id) {
    docId = id;
  }

  return {
    docId: docId
  };
};

const mapDispatchProps = (dispatch) => {
  return {};
};

const Docs = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(DocsTemplate));

export default Docs;
