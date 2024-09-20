import markupToString from './markupToString';

export const getExampleContent = () => {
  const Example = () => (
    <svg>
      <image
        x="10%"
        y="10%"
        width="80%"
        height="50%"
        preserveAspectRatio="xMidYMid slice"
        xlinkHref="https://placekitten.com/800/400"
        filter="url(#filter)"
      />

      <g filter="url(#filter)">
        <text x="50%" y="79%" dy=".35em" textAnchor="middle">
          Text
        </text>
      </g>
    </svg>
  );

  return markupToString(<Example />);
};
