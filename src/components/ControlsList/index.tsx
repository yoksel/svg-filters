import { NavLink } from 'react-router-dom';

import { primitivesAttrs } from '../../data';
import useSection from '../../hooks/useSection';
import {
  isPrimitiveItem,
  NativeEventCoords,
  Preset,
  PrimitiveItem,
  Section,
} from '../../store/types';
import clsx from 'clsx';

import './ControlsList.scss';

interface AddPrimitiveArgs {
  primitive: PrimitiveItem;
  nativeEvent: NativeEventCoords;
  section: Section;
}

interface ControlsListProps {
  items: (PrimitiveItem | Preset)[];
  control?: string;
  addPrimitive?: (args: AddPrimitiveArgs) => void;
}

const ControlsList = ({ items, control = 'button', addPrimitive }: ControlsListProps) => {
  const { section, id } = useSection();

  return (
    <nav className={clsx('ControlsList', `ControlsList--${section}`)}>
      {items?.map((primitive: PrimitiveItem | Preset) => {
        const groupName = 'groupName' in primitive ? primitive.groupName : undefined;
        const groupData = groupName ? primitivesAttrs[groupName] : null;
        const ControlClass = clsx(
          'Control',
          `Control--${control}`,
          `Control-${section}`,
          id === primitive.id && ['Control--current', `Control-${section}--current`],
        );

        let name = primitive.name;
        if (groupName && groupData) {
          // primitives
          name = groupData.name;
        }

        if (control === 'NavLink') {
          const url = `/${section}/${primitive.id}`;

          return (
            <NavLink key={primitive.id} to={url} className={ControlClass}>
              <span className="Control__text">{name}</span>
            </NavLink>
          );
        }

        return (
          <button
            className={ControlClass}
            key={primitive.id}
            onMouseDown={(event) => {
              if (!isPrimitiveItem(primitive)) return;

              const nativeEvent = {
                offsetX: event.nativeEvent.offsetX,
                offsetY: event.nativeEvent.offsetY,
              };

              addPrimitive?.({
                primitive,
                nativeEvent,
                section,
              });
            }}
          >
            {name}
          </button>
        );
      })}
    </nav>
  );
};

// export default withRouter(ControlsList);
export default ControlsList;
