import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useSection from '../../hooks/useSection';
import { FilterParams, isPrimitivesSection } from '../../store/types';
import ColorInterpolFiltersSwitcher from '../ColorInterpolFiltersSwitcher';
import { getAllPrimitivesCode } from './helpers';

import './Code.scss';

const getFilterAttrs = (filterData?: FilterParams) => {
  if (!filterData) return;

  if (filterData.style) {
    // Do not print style in filter code
    delete filterData.style;
  }

  const attrsList = Object.keys(filterData).reduce<string[]>((prev, attrName) => {
    let value = filterData[attrName as keyof FilterParams];
    let valueAsString: string = '';

    if (typeof value === 'object') {
      const valueWithStringTypes = value as { [key: string]: string };
      const valueList = Object.keys(valueWithStringTypes).reduce<string[]>((prev, valueKey) => {
        prev.push(`${valueKey}: ${valueWithStringTypes[valueKey]}`);

        return prev;
      }, []);

      valueAsString = valueList.join(';');
    }
    if (attrName === 'colorInterpolationFilters') {
      attrName = 'color-interpolation-filters';
    }

    prev.push(`${attrName}="${valueAsString || value}"`);

    return prev;
  }, []);

  return attrsList.join(' ');
};

/** Section containing Textarea with filter code and color interpolation switcher */
const Code = () => {
  const { section } = useSection();
  const primitivesFilter = useSelector((state: RootState) => state.primitives.filter);
  const primitivesBySections = useSelector((state: RootState) => state.primitives.sections);

  if (!isPrimitivesSection(section)) return null;

  const primitives = primitivesBySections[section];
  const filterAttrs = getFilterAttrs(primitivesFilter);
  const primitivesCode = getAllPrimitivesCode(primitives).join('\n');

  if (process.env.NODE_ENV !== 'production' && primitives?.length) {
    // Temporary for extracting good presets
    // printCode()
  }

  const value = primitivesCode
    ? `<filter id="filter" ${filterAttrs}>\n${primitivesCode}\n</filter>`
    : '';

  return (
    <section className="Code">
      <h2 className="visually-hidden">Filter code</h2>
      <ColorInterpolFiltersSwitcher />
      <textarea className="Code__textarea" value={value} readOnly={true} spellCheck="false" />
    </section>
  );
};

export default Code;
