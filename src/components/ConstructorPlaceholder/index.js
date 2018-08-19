import React, {Component} from 'react';

import './ConstructorPlaceholder.css';

class ConstructorPlaceholder extends Component {
  text = {
    playground: 'Drag primitives here to start',
    presets: 'Choose a preset to play with its primitives',
    docs: 'Choose primitive to see docs and a live demo'
  };

  render() {
    const {section = 'playground'} = this.props;

    return (
      <div
        className="ConstructorPlaceholder"
        dangerouslySetInnerHTML={{__html: this.text[section]}}>
      </div>
    );
  }
}

export default ConstructorPlaceholder;
