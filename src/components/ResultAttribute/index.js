import React from 'react';
import PropTypes from 'prop-types';

import './ResultAttribute.css';

const ResultAttribute = ({value}) => {
  return (
    <span
      className="ResultAttribute">
      result="<span className='ResultAttribute__name'>
        {value}
      </span>"
    </span>
  );
};

export default ResultAttribute;

ResultAttribute.propTypes = {
  value: PropTypes.string
};
