import './ResultAttribute.scss';

/** Element with result attribute for PrimitivePanel */
const ResultAttribute = ({ value }: { value: string | number }) => {
  return (
    <span className="ResultAttribute">
      result="<span className="ResultAttribute__name">{value}</span>"
    </span>
  );
};

export default ResultAttribute;
