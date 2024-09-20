import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

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
  section?: string;
  className?: string;
}

export const HeaderNav = ({ section, className }: HeaderNavProps) => {
  // console.log({ section });

  return (
    <nav className={className}>
      {sectionsList.map((item) => {
        const { id, name, url } = item;
        const navItemClass = `Header__nav-link Header__nav-link-${id}`;

        if (item.id === section) {
          return (
            <span key={id} className={navItemClass}>
              <span className="Header__nav-text">{name}</span>
            </span>
          );
        }

        return (
          <NavLink
            key={id}
            to={url}
            className={clsx(
              navItemClass,
              ({ isActive }: { isActive: boolean }) =>
                isActive && `Header__nav-link--current Header__nav-link-${id}--current`,
            )}
          >
            <span className="Header__nav-text">{name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
