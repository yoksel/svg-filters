import InputSelect from '../../containers/PrimitivePanelInputSelect';
import { primitivesAttrs } from '../../data';
import { PrimitiveItem } from '../../store/types';

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

  // to fix
  let actualValue = value as string;
  let secondValue = '';

  const { groupName } = primitive;

  let secondOptionsList = [];
  let tiedValues = {};
  let tiedTypes = {};
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
  }

  if (double && typeof value === 'string') {
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
      tiedValues = {
        ...tiedValues,
        ...values.variants.values,
      };
    }
  }

  return (
    <>
      <InputSelect
        id={primitive.id}
        key={primitive.id}
        param={paramKey}
        value={actualValue}
        secondValue={secondValue}
        valuesList={actualOptionsList}
        parentId={parentId}
        tiedValues={tiedValues}
        tiedTypes={tiedTypes}
        dependencies={dependencies}
      />

      {double && secondOptionsList.length > 0 && (
        <InputSelect
          id={primitive.id}
          key={primitive.id + 1}
          param={paramKey}
          value={secondValue}
          firstValue={actualValue}
          valuesList={secondOptionsList}
          parentId={parentId}
          tiedValues={tiedValues}
          tiedTypes={tiedTypes}
          dependencies={dependencies}
        />
      )}
    </>
  );
};

export default PrimitivePanelInputSelect;
