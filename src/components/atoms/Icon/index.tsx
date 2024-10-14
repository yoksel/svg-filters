import './Icon.scss';

interface IconProps {
  symbol: 'doc' | 'eye' | 'eye-blocked' | 'plus' | 'cross';
  color: string,
  size: string,
};

const Icon = ({ symbol, color = 'currentColor', size }: IconProps) => (
  <svg className={`icon icon-${symbol}`} fill={color} width={size} height={size} aria-hidden={true}>
    <use xlinkHref={`#icon-${symbol}`} />
  </svg>
);

export default Icon;


