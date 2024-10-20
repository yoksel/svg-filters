import { NavLink } from 'react-router-dom';
import { PrimitiveItem, Section } from '../../../store/types';

import './Constructor.scss';

interface ConstructorProps extends React.PropsWithChildren {
  primitives?: PrimitiveItem[];
  purgePrimitives: () => void;
  moveToPlayground: () => void;
  section: Section;
}

const Constructor = ({
  primitives,
  purgePrimitives,
  moveToPlayground,
  section,
  children,
}: ConstructorProps) => {
  const showMoveToPlaygroundButton =
    section !== 'playground' && primitives && primitives?.length > 0;
  const showClearButton = Boolean(primitives?.length) && section === 'playground';

  return (
    <section className="Constructor">
      <h2 className="visually-hidden">Constructor</h2>
      <div className="Constructor__tag">
        &lt;filter id="#filter"&gt;
        {showClearButton && (
          <button
            className="Constructor__button Constructor__button--purge"
            onClick={purgePrimitives}
          >
            Clear
          </button>
        )}
        {showMoveToPlaygroundButton && (
          <NavLink
            className="Constructor__button Constructor__button--move"
            to="/"
            onClick={moveToPlayground}
          >
            Move to playground
          </NavLink>
        )}
      </div>
      <div className="Constructor__container">{children}</div>

      <div className="Constructor__tag">&lt;/filter&gt;</div>
    </section>
  );
};

export default Constructor;
