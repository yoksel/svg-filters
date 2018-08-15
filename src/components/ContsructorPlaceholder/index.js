import React, {Component} from 'react';

import './ContsructorPlaceholder.css';

class ContsructorPlaceholder extends Component {
  text = {
    playground: 'Drag primitives here to start',
    presets: 'Choose a preset to play with its primitives',
    docs: 'Choose primitive to see docs and a live demo'
  };

  render() {
    const {section = 'playground'} = this.props;

    return (
      <div
        className="ContsructorPlaceholder"
        dangerouslySetInnerHTML={{__html: this.text[section]}}>
      </div>
    );
  }
}

export default ContsructorPlaceholder;
