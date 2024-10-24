const getSvgContentByPreviewType = ({
  filterUrl,
  previewType,
  customSvgCode,
}: {
  filterUrl: string;
  previewType: string;
  customSvgCode: string;
}): JSX.Element | undefined => {
  if (previewType === 'edit') {
    if (!customSvgCode) return;

    return <svg dangerouslySetInnerHTML={{ __html: customSvgCode }}></svg>;
  }

  if (previewType === 'image') {
    return (
      <svg>
        <image
          x="10%"
          y="10%"
          width="80%"
          height="80%"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref="./manja-vitolic-gKXKBY-C-Dk-unsplash.jpg"
          filter={filterUrl}
        />
      </svg>
    );
  }

  if (previewType === 'text') {
    return (
      <svg>
        <g filter={filterUrl}>
          <text x="50%" y="50%" dy=".35em" textAnchor="middle">
            Text
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg>
      <image
        x="10%"
        y="10%"
        width="80%"
        height="50%"
        preserveAspectRatio="xMidYMid slice"
        xlinkHref="./manja-vitolic-gKXKBY-C-Dk-unsplash.jpg"
        filter={filterUrl}
      />

      <g filter={filterUrl}>
        <text x="50%" y="79%" dy=".35em" textAnchor="middle">
          Text
        </text>
      </g>
    </svg>
  );
};

export default getSvgContentByPreviewType;
