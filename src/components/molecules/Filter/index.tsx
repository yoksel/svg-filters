import { FilterParams, PrimitiveItem } from '../../../store/types';
import Primitive from '../Primitive';

interface FilterProps {
  primitives: PrimitiveItem[];
  filterProps?: FilterParams;
}

/** Element `filter` for using inside element `svg` in Preview */
const Filter = ({ primitives, filterProps }: FilterProps) => (
  <filter id="filter" {...filterProps}>
    {primitives.map((primitive) => {
      if (primitive.disabled) {
        return null;
      }

      return (
        <Primitive key={primitive.id} primitive={primitive}>
          {primitive.children?.map((item) => {
            if (item.disabled) {
              return null;
            }

            return <Primitive key={item.id} primitive={item} />;
          })}
        </Primitive>
      );
    })}
  </filter>
);

export default Filter;