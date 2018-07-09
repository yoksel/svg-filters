import React, {Component} from 'react';
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
