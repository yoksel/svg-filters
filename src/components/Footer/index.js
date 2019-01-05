import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';

import Wrapper from '../Wrapper';

import './Footer.css';

class Footer extends Component {
  getLink = () => {
    if (this.props.match.url === '/read') {
      return (
        <span
          className="Footer__link Footer__link--read"
        >Useful Resources</span>
      );
    }

    return (
      <NavLink
        to="/read"
        className="Footer__link Footer__link--read"
      >Useful Resources</NavLink>
    );
  }

  render() {
    return (
      <footer className="Footer">
        <Wrapper>
          <div className="Footer__content">
            {this.getLink()}
            <a
              href="https://github.com/yoksel/svg-filters/"
              className="Footer__link Footer__link--gh"
            >Project on GitHub</a>
            <a
              href="https://twitter.com/yoksel_en"
              className="Footer__link Footer__link--tw"
            >@yoksel_en</a>
          </div>
        </Wrapper>
      </footer>
    );
  }
}

export default withRouter(Footer);
