import './Icon.scss';

export type IconSymbol = 'doc' | 'eye' | 'eye-blocked' | 'plus' | 'cross';

interface IconProps {
  symbol: IconSymbol;
  color: string;
  size: string;
};

const Icon = ({ symbol, color = 'currentColor', size }: IconProps) => (
  <svg className={`icon icon-${symbol}`} fill={color} width={size} height={size} aria-hidden={true}>
    <use xlinkHref={`#icon-${symbol}`} />
  </svg>
);

export default Icon;


