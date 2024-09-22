import { NavLink } from 'react-router-dom';

import { primitivesAttrs } from '../../data';
import useSection from '../../hooks/useSection';
import { PrimitiveItem } from '../molecules/Primitive';

import './ControlsList.scss';
import { NativeEventCoords, Section } from '../../store/types';

interface AddPrimitiveArgs {
  item: PrimitiveItem;
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
      {items?.map((item: PrimitiveItem) => {
        const groupData = primitivesAttrs[item.groupName];
        const ControlClassList = ['Control', `Control--${control}`, `Control-${section}`];

        if (id === item.id) {
          ControlClassList.push('Control--current');
          ControlClassList.push(`Control-${section}--current`);
        }

        const ControlClass = ControlClassList.join(' ');

        let name = item.name;
        if (item.groupName) {
          // primitives
          name = groupData.name;
        }

        if (control === 'NavLink') {
          const url = `/${section}/${item.id}`;

          return (
            <NavLink key={item.id} to={url} className={ControlClass}>
              <span className="Control__text">{name}</span>
            </NavLink>
          );
        }

        return (
          <button
            className={ControlClass}
            key={item.id}
            onMouseDown={(event) => {
              const nativeEvent = {
                offsetX: event.nativeEvent.offsetX,
                offsetY: event.nativeEvent.offsetY,
              };

              addPrimitive?.({
                item,
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
