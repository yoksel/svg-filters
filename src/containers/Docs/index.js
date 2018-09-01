import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

import {toggleDocs} from '../../store/actions';

import DocsTemplate from '../../components/Docs';

const mapStateToProps = (state, {docId, match}) => {
  const {section, id} = match.params;
  if (section === 'docs' && id) {
    docId = id;
  }

  return {
    docId: docId
  };
};

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
    toggleDocs: () => {
      dispatch(toggleDocs(params));
    }
  };
};

const Docs = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(DocsTemplate));

export default Docs;

Docs.propTypes = {
  docId: PropTypes.string
};
