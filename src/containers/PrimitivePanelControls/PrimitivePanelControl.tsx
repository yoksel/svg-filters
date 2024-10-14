import Icon, { IconSymbol } from '../../components/atoms/Icon';

const PrimitivePanelControl = ({
  type,
  symbol,
  title,
  onClick,
}: {
  title: string;
  type: 'toggle' | 'docs' | 'add' | 'remove';
  symbol: IconSymbol;
  onClick: () => void;
}) => {
  return (
    <button
      className={`PrimitivePanelControl PrimitivePanelControl--${type}`}
      onClick={onClick}
      type="button"
      title={title}
    >
      <Icon symbol={symbol} color="currentColor" size="16" />
    </button>
  );
};

export default PrimitivePanelControl;
