import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import useSection from '../../hooks/useSection';

const sectionsList = [
  {
    id: 'playground',
    name: 'Playground',
    url: '/',
  },
  {
    id: 'presets',
    name: 'Presets',
    url: '/presets',
  },
  {
    id: 'docs',
    name: 'Docs',
    url: '/docs',
  },
];

interface HeaderNavProps {
  className?: string;
}

export const HeaderNav = ({ className }: HeaderNavProps) => {
  const section = useSection();

  return (
    <nav className={className}>
      {sectionsList.map((item) => {
        const { id, name, url } = item;
        const navItemClass = clsx(
          `Header__nav-link Header__nav-link-${id}`,
          item.id === section && `Header__nav-link--current Header__nav-link-${id}--current`,
        );

        if (item.id === section) {
          return (
            <span key={id} className={navItemClass}>
              <span className="Header__nav-text">{name}</span>
            </span>
          );
        }

        // console.lo
        return (
          <NavLink key={id} to={url} className={navItemClass}>
            <span className="Header__nav-text">{name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
