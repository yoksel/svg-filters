import React from 'react';

import Wrapper from '../Wrapper';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <Wrapper>
        <div className="Footer__content">
          <a href="https://github.com/yoksel/svg-filters/">Project on GitHub</a>
          <a href="https://twitter.com/yoksel_en">@yoksel_en</a>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
