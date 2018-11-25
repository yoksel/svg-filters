import React from 'react';
import {NavLink} from 'react-router-dom';

import Wrapper from '../Wrapper';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <Wrapper>
        <div className="Footer__content">
          <NavLink
            to="/read"
            className="Footer__link Footer__link--read"
          >Reading List</NavLink>
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
};

export default Footer;
