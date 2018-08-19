import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {docsData} from '../Data';

import './Docs.css';

class Docs extends Component {
  render() {
    const docId = this.props.docId;
    const currentDoc = docsData[docId];

    const DocsClass = [
      'Docs',
      docId ? 'Docs--opened' : ''
    ].join(' ');

    if (!currentDoc) {
      return null;
    }

    const {name, desc} = currentDoc;
    const link = <a className="Docs__link" href={currentDoc.link} target="_blank">Specification</a>;

    const props = currentDoc.props.map(prop => {
      let {name: propName, value: propValue, desc: propDesc} = prop;
      let valueElem;

      if (prop.disable) {
        return null;
      }

      if (!propValue) {
        propValue = docsData[propName].value;
        propDesc = docsData[propName].desc;
      }

      if (propValue) {
        valueElem = <p className="Doc-prop__value"><b>Value:</b> {propValue}</p>;
      }

      return (
        <li className="Docs__item Doc-prop" key={propName}>
          <b className="Doc-prop__name">{propName}</b>
          {valueElem}
          <p className="Doc-prop__desc" dangerouslySetInnerHTML={{__html: propDesc}}></p>
        </li>
      );
    });

    return (
      <section className={DocsClass}>
        <h2 className="visuallyhidden">Docs</h2>
        <div className="Docs__content">
          <h3 className="Docs__title">{name}</h3>
          {link}
          <p className="Docs__desc" dangerouslySetInnerHTML={{__html: desc}}></p>

          <h4 className="Docs__list-title">Attributes:</h4>
          <ul className="Docs__list">{props}</ul>
        </div>
      </section>
    );
  }
}

export default Docs;

Docs.propTypes = {
  docId: PropTypes.string
};
