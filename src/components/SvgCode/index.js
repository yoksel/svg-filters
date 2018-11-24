import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import Icon from '../Icon';
import InputTextarea from '../InputTextarea';

import './SvgCode.css';

class SvgCode extends Component {
  constructor(props) {
    super(props);
    const {filterId} = this.props;
    const filterUrl = filterId ? `url(#${filterId})` : '';

    this.state = {
      panelIsOpen: false,
      filterUrl
    };
  }

  togglePanel = () => {
    this.setState({
      panelIsOpen: !this.state.panelIsOpen
    });
  }

  getExampleContent = () => {
    const {filterUrl} = this.state;

    const markup = (
      <svg>
        <image
          x="10%" y="10%"
          width="80%" height="50%"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref="https://placekitten.com/800/400"
          filter={filterUrl}
        />

        <g filter={filterUrl}>
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
      .replace('</svg', '\n<svg');

    return markupString;
  };

  addExample = () => {

  };

  render() {
    const {panelIsOpen, filterUrl} = this.state;
    const exampleContent = this.getExampleContent();
    let SvgCodeClass = 'SvgCode';

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


            <p className="SvgCode__text">
              Add <code>filter="{filterUrl}"</code> as attribute to apply filter effect to group or shape
            </p>

            <InputTextarea
              value={this.props.value}
              onChange={this.props.onChange}
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
        >Edit</button>
      </div>
    );
  }
}

export default SvgCode;

SvgCode.propTypes = {
  filterId: PropTypes.string
};
