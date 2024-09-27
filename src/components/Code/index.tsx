import ColorInterpolFiltersSwitcher from '../../containers/ColorInterpolFiltersSwitcher';
import { FilterParams, PrimitiveItem } from '../../store/types';

import './Code.scss';
import { getAllPrimitivesCode } from './helpers';

interface CodeProps {
  primitives?: PrimitiveItem[];
  filterData?: FilterParams;
}

const getFilterAttrs = (filterData?: FilterParams) => {
  if (!filterData) return;

  if (filterData.style) {
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

const Code = ({ filterData, primitives }: CodeProps) => {
  const filterAttrs = getFilterAttrs(filterData);
  const primitivesCode = getAllPrimitivesCode(primitives).join('\n');

  if (process.env.NODE_ENV !== 'production' && primitives?.length) {
    // Temporary for extracting good presets
    console.groupCollapsed('Filter code');
    console.log(JSON.stringify(primitives, null, '\t'));
    console.groupEnd();
  }

  const value = primitivesCode
    ? `<filter id="filter" ${filterAttrs}>\n${primitivesCode}\n</filter>`
    : '';

  return (
    <section className="Code">
      <h2 className="visuallyhidden">Filter code</h2>
      <ColorInterpolFiltersSwitcher />
      <textarea className="Code__textarea" value={value} onChange={() => {}} spellCheck="false" />
    </section>
  );
};

export default Code;
