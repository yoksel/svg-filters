import { NavLink } from 'react-router-dom';

import Wrapper from '../atoms/Wrapper';
import { HeaderNav } from './HeaderNav';

import './Header.scss';
import useSection from '../../hooks/useSection';

const Header = () => {
  const { section } = useSection();

  const getLogoLink = () => {
    const pageTitle = 'SVG Filters';

    if (section !== 'playground') {
      const logoLinkProps = {
        to: '/',
      };

      return (
        <NavLink className="Header__logo" {...logoLinkProps}>
          {pageTitle}
        </NavLink>
      );
    }

    return <span className="Header__logo">{pageTitle}</span>;
  };

  return (
    <header className="Header">
      <Wrapper>
        <div className="Header__content">
          <h1 className="Header__title">{getLogoLink()}</h1>

          <HeaderNav className="Header__nav" />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
