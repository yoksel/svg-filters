import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import Icon from '../Icon';
import InputTextarea from '../InputTextarea';

import './SvgCode.css';

class SvgCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panelIsOpen: false
    };
  }

  togglePanel = () => {
    this.setState({
      panelIsOpen: !this.state.panelIsOpen
    });
  }

  getExampleContent = () => {
    const markup = (
      <svg>
        <image
          x="10%" y="10%"
          width="80%" height="50%"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref="https://placekitten.com/800/400"
          filter="url(#filter)"
        />

        <g filter="url(#filter)">
          <text
            x="50%" y="79%"
            dy=".35em"
            textAnchor="middle">Text</text>
        </g>
      </svg>
    );

    let markupString = ReactDOMServer.renderToStaticMarkup(markup);
    markupString = markupString
      .replace('<image', '\n\t<image')
      .replace('<g', '\n\n\t<g')
      .replace('</g', '\n\t</g')
      .replace('<text', '\n\t\t<text')
      .replace('</svg', '\n</svg');

    return markupString;
  };

  getButtonText = () => {
    const {value} = this.props;

    if (this.state.panelIsOpen) {
      return 'Close';
    }

    if (value === '') {
      return 'Add';
    }

    return 'Edit';
  };

  getTip = () => {
    const {value} = this.props;

    if (!value) {
      return;
    }

    const valueCleared = value
      .replace(/"|'/g, '');

    const isFilterInStr = valueCleared.indexOf('filter=url(#filter)') > -1;

    if (!isFilterInStr) {
      return (
        <p className="SvgCode__text">
          Add <code>filter="url(#filter)"</code> as attribute to apply filter effect to group or shape.
        </p>
      );
    }
  };

  render() {
    const {panelIsOpen} = this.state;
    const {value, onChange} = this.props;
    const exampleContent = this.getExampleContent();
    let SvgCodeClass = 'SvgCode';
    const buttonText = this.getButtonText();

    if (panelIsOpen) {
      SvgCodeClass += ' SvgCode--opened';
    }

    return (
      <div className={SvgCodeClass}>
        <div className="SvgCode__container">
          <div className="SvgCode__content">
            <button
              className="SvgCode__close-button"
              onClick={this.togglePanel}
            ><Icon
                symbol="cross"
                color="currentColor"
                size="12"
              /></button>

            {this.getTip()}

            <InputTextarea
              value={value}
              onChange={onChange}
              className="SvgCode__InputTextarea"
            />

            <button
              className="SvgCode__control SvgCode__control--example"
              onClick={() => {
                this.props.addExample(exampleContent);
              }}
            >Add example</button>
          </div>
        </div>

        <button
          className="SvgCode__control SvgCode__control--edit"
          onClick={this.togglePanel}
        >{buttonText}</button>
      </div>
    );
  }
}

export default SvgCode;

SvgCode.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  filterId: PropTypes.string
};
