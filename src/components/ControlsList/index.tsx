import { NavLink } from 'react-router-dom';

import { primitivesAttrs } from '../../data';
import useSection from '../../hooks/useSection';
import { NativeEventCoords, PrimitiveItem, Section } from '../../store/types';

import './ControlsList.scss';

interface AddPrimitiveArgs {
  primitive: PrimitiveItem;
  nativeEvent: NativeEventCoords;
  section: Section;
}

interface ControlsListProps {
  items: PrimitiveItem[];
  control?: string;
  addPrimitive?: (args: AddPrimitiveArgs) => void;
}

const ControlsList = ({ items, control = 'button', addPrimitive }: ControlsListProps) => {
  const { section, id } = useSection();
  const ControlsListClass = ['ControlsList', `ControlsList--${section}`].join(' ');

  console.log({ items });

  return (
    <nav className={ControlsListClass}>
      {items?.map((primitive: PrimitiveItem) => {
        const groupData = primitivesAttrs[primitive.groupName];
        const ControlClassList = ['Control', `Control--${control}`, `Control-${section}`];

        if (id === primitive.id) {
          ControlClassList.push('Control--current');
          ControlClassList.push(`Control-${section}--current`);
        }

        const ControlClass = ControlClassList.join(' ');

        let name = primitive.name;
        if (primitive.groupName) {
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
