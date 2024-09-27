import './ResultAttribute.scss';

const ResultAttribute = ({ value }: { value: string | number }) => {
  return (
    <span className="ResultAttribute">
      result="<span className="ResultAttribute__name">{value}</span>"
    </span>
  );
};

export default ResultAttribute;
