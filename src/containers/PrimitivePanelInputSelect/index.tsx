import { primitivesAttrs } from '../../data';
import { isPrimitivesSection, PrimitiveItem } from '../../store/types';
import useSection from '../../hooks/useSection';
import { useDispatch } from 'react-redux';
import { changePrimitiveProp } from '../../store/primitivesSlice';
import { updateDependencies, updateTiedTypes, updateTiedValues } from './utils';
import InputSelect from '../../components/atoms/InputSelect';

interface PrimitivePanelInputSelectProps {
  primitive: PrimitiveItem;
  paramKey: string;
  resultsList: string[];
  parentId?: string;
}

const PrimitivePanelInputSelect = ({
  primitive,
  paramKey,
  resultsList,
  parentId,
}: PrimitivePanelInputSelectProps) => {
  const param = primitive.params[paramKey];
  const { value } = param;
  const values = primitive.params.values;
  const dispatch = useDispatch();
  const { section } = useSection();

  if (!isPrimitivesSection(section)) return null;

  // to fix
  let actualValue = value as string;
  let secondValue = '';

  const { groupName } = primitive;

  let secondOptionsList = [];
  let tiedValues: { [key: string]: string } = {};
  let tiedTypes: { [key: string]: string } = {};
  const groupData = primitivesAttrs[groupName];
  const { inputsData } = groupData;
  // @ts-expect-error
  const { double, valuesKeys, dependencies } = inputsData[paramKey];
  // @ts-expect-error
  let actualOptionsList = groupData[paramKey];

  if (paramKey === 'in' || paramKey === 'in2') {
    // @ts-expect-error
    actualOptionsList = primitivesAttrs[paramKey];
    actualOptionsList = actualOptionsList ? actualOptionsList.concat(resultsList) : resultsList;
  } else if (double && typeof value === 'string') {
    let valuesList = value.split(' ');
    actualValue = valuesList[0];
    secondValue = valuesList[1];

    if (valuesKeys && valuesKeys.length === 2) {
      // @ts-expect-error
      actualOptionsList = groupData[valuesKeys[0]];
      // @ts-expect-error
      secondOptionsList = groupData[valuesKeys[1]];
    }
  }

  // @ts-expect-error
  if (inputsData.values) {
    // @ts-expect-error
    tiedValues = inputsData.values.variants.values;
    // @ts-expect-error
    tiedTypes = inputsData.values.variants.types;

    if (values.variants) {
      // @ts-expect-error
      tiedValues = {
        ...tiedValues,
        ...values.variants.values,
      };
    }
  }

  const onChange = (value: string) => {
    const initialProps = {
      id: primitive.id,
      parentId,
      // TODO: fix it
      param: paramKey,
      value,
      section,
    };

    // Change initial prop value
    dispatch(changePrimitiveProp(initialProps));

    // Enable/disable dependencies
    // k-attributes in composite
    if (dependencies) {
      updateDependencies({ initialProps, dispatch, dependencies, value });
    }

    // Change tied values
    // colormatrix
    if (tiedValues) {
      updateTiedValues({ initialProps, dispatch, newValue: tiedValues[value] });
    }

    // Change tied types
    // matrix in colormatrix
    if (tiedTypes) {
      updateTiedTypes({ initialProps, dispatch, propType: tiedTypes[value] });
    }
  };

  return (
    <>
      <InputSelect
        secondValue={secondValue}
        value={actualValue}
        valuesList={actualOptionsList}
        onChange={onChange}
      />

      {double && secondOptionsList.length > 0 && (
        <InputSelect
          secondValue={secondValue}
          value={actualValue}
          valuesList={actualOptionsList}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default PrimitivePanelInputSelect;
