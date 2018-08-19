import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';

import './Header.css';

class Header extends Component {
  render() {
    const {section = 'playground'} = this.props.match.params;
    const logoLinkProps = {};
    const sectionsList = [
      {
        id: 'playground',
        name: 'Playground',
        url: '/'
      },
      {
        id: 'presets',
        name: 'Presets',
        url: '/presets'
      },
      {
        id: 'docs',
        name: 'Docs',
        url: '/docs'
      }
    ];

    if (section !== 'playground') {
      logoLinkProps.to = '/';
    } else {
      logoLinkProps.to = '';
    }

    const navItems = sectionsList.map(item => {
      const {id, name, url} = item;
      const navItemClassList = [
        'Header__nav-link',
        `Header__nav-link-${id}`
      ];

      if (item.id === section) {
        navItemClassList.push('Header__nav-link--current');
        navItemClassList.push(`Header__nav-link-${id}--current`);
      }

      const navItemClass = navItemClassList.join(' ');

      if (item.id === section) {
        return (
          <span
            key={id}
            className={navItemClass}
          >
            <span className="Header__nav-text">{name}</span>
          </span>
        );
      }

      return (
        <NavLink
          key={id}
          to={url}
          className={navItemClass}
        >
          <span className="Header__nav-text">{name}</span>
        </NavLink>
      );
    });

    return (
      <header className="Header">
        <NavLink
          className="Header__logo"
          {...logoLinkProps}
        >SVG Filters</NavLink>

        <nav className="Header__nav">
          {navItems}
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
