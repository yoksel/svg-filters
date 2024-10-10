import markupToString from './markupToString';

export const getExampleContent = () => {
  const Example = () => (
    <svg>
      <g filter="url(#filter)">
        <image
          x="10%"
          y="10%"
          width="80%"
          height="50%"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref="./manja-vitolic-gKXKBY-C-Dk-unsplash.jpg"
        />

        <text x="50%" y="79%" dy=".35em" textAnchor="middle">
          Text
        </text>
      </g>
    </svg>
  );

  return markupToString(<Example />);
};
