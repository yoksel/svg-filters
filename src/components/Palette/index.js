import React, {Component} from 'react';

import './Palette.css';

class Palette extends Component {
  render() {
    return (
      <div className="Palette">
        <ul>
          <li className="hlt hlt--red">hlt--red</li>
          <li className="hlt hlt--orange">hlt--orange</li>
          <li className="hlt hlt--gold">hlt--gold</li>
          <li className="hlt hlt--green">hlt--green</li>
          <li className="hlt hlt--blue">hlgt--blue</li>

          <li className="color-text color-text--red">red</li>
          <li className="color-text color-text--orange">orange</li>
          <li className="color-text color-text--gold">gold</li>
          <li className="color-text color-text--green">green</li>
          <li className="color-text color-text--blue">blue</li>
        </ul>
      </div>
    );
  }
}

export default Palette;
