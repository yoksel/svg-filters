import { NavLink } from 'react-router-dom';

import Wrapper from '../../atoms/Wrapper';
import { Section } from '../../../store/types';

import './Footer.scss';

/** Page footer */
const Footer = ({ section }: { section: Section }) => {
  const getLink = () => {
    if (section === 'read') {
      return <span className="Footer__link Footer__link--read">Useful Resources</span>;
    }

    return (
      <NavLink to="/read" className="Footer__link Footer__link--read">
        Useful Resources
      </NavLink>
    );
  };

  return (
    <footer className="Footer">
      <Wrapper>
        <div className="Footer__content">
          {getLink()}
          <a
            href="https://github.com/yoksel/svg-filters/"
            className="Footer__link Footer__link--gh"
          >
            Project on GitHub
          </a>
          <a href="https://twitter.com/yoksel_en" className="Footer__link Footer__link--tw">
            @yoksel_en
          </a>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
