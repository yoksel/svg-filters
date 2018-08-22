import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {docsData} from '../Data';

import './Docs.css';

class Docs extends Component {
  state = {
    currentProp: null
  };

  setCurrentProp = (propId) => {
    let currentProp = propId;

    if (this.state.currentProp === propId) {
      currentProp = null;
    }

    this.setState({
      currentProp: currentProp
    });
  };

  getPropsList = (currentDocProps) => {
    const embeded = this.props.embeded;
    const propsList = currentDocProps.map(prop => {
      let {name: propName, value: propValue, desc: propDesc} = prop;
      let valueElem;
      let propNameElem = <b className="Doc-prop__name">{propName}</b>;

      if (prop.disable) {
        return null;
      }

      if (embeded) {
        const propNameClass = [
          'Doc-prop__name',
          'Doc-prop__control',
          this.state.currentProp === propName ? 'Doc-prop__control--current' : ''
        ].join(' ');

        propNameElem = <button
          type="button"
          key={propName}
          className={propNameClass}
          onClick={() => {
            this.setCurrentProp(propName);
          }}
        >{propName}</button>;
      }


      if (!propValue) {
        propValue = docsData[propName].value;
        propDesc = docsData[propName].desc;
      }

      if (propValue) {
        valueElem = <p className="Doc-prop__value"><b>Value:</b> {propValue}</p>;
      }

      const docPropClass = [
        'Docs__item',
        'Doc-prop',
        this.state.currentProp === propName ? 'Doc-prop--current' : ''
      ].join(' ');

      if (embeded) {
        return {
          name: propNameElem,
          body: (
            <li className={docPropClass} key={propName}>
              {valueElem}
              <p className="Doc-prop__desc" dangerouslySetInnerHTML={{__html: propDesc}}></p>
            </li>
          )
        };
      }
      return (
        <li className={docPropClass} key={propName}>
          {propNameElem}
          {valueElem}
          <p className="Doc-prop__desc" dangerouslySetInnerHTML={{__html: propDesc}}></p>
        </li>
      );
    });

    if (embeded) {
      return (
        <div className="Docs-tabs">
          <div className="Docs__list Docs-tabs__controls">{propsList.map(item => item.name)}</div>
          <ul className="Docs__list Docs-tabs__content">{propsList.map(item => item.body)}</ul>
        </div>
      );
    }

    return <ul className="Docs__list Docs-props">{propsList}</ul>;
  }

  render() {
    const docId = this.props.docId;
    const currentDoc = docsData[docId];
    const embeded = this.props.embeded;

    const DocsClass = [
      'Docs',
      docId ? 'Docs--opened' : '',
      embeded ? 'Docs--embeded' : ''
    ].join(' ');

    if (!currentDoc) {
      return null;
    }

    const {name, desc} = currentDoc;
    const link = <a
      className="Docs__link"
      href={currentDoc.link}
      target="_blank"
      rel="noopener noreferrer">Specification</a>;

    const propsList = this.getPropsList(currentDoc.props);

    return (
      <section className={DocsClass}>
        <h2 className="visuallyhidden">Docs</h2>
        <div className="Docs__content">
          <h3 className="Docs__title">{name}</h3>
          {link}
          <p className="Docs__desc" dangerouslySetInnerHTML={{__html: desc}}></p>

          <h4 className="Docs__list-title">Attributes:</h4>
          {propsList}
        </div>
      </section>
    );
  }
}

export default Docs;

Docs.propTypes = {
  docId: PropTypes.string
};
