import Filter from '../../../containers/Filter';
import PlaygroundSwitcher from '../../../containers/PlaygroundSwitcher';
import SvgCodeContainer from '../../../containers/SvgCode';

import './Preview.scss';

import './gray-cells.png';

interface PlaygroundProps {
  filterId?: string;
  previewType: string;
  svgCode: string;
}

const Preview = ({ filterId, previewType = 'image-and-text', svgCode }: PlaygroundProps) => {
  const filterUrl = filterId ? `url(#${filterId})` : '';

  const getTip = (content?: ReturnType<typeof getSvgContentByPlaygroundType>) => {
    let tipText = '';
    let modClassesList = ['Playground__tip'];

    if (!content) {
      tipText = 'Add some SVG';
      modClassesList.push('Playground__tip--add-content');
    } else if (!filterId && previewType === 'edit') {
      tipText =
        'If the filter is empty, content may disappear. Add a primitive or choose a preset.';
      modClassesList.push('Playground__tip--add-primitives');
    }

    if (tipText) {
      return <div className={modClassesList.join(' ')}>{tipText}</div>;
    }
  };

  const getSvgContentByPlaygroundType = () => {
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

    if (previewType === 'edit') {
      return svgCode ? <svg dangerouslySetInnerHTML={{ __html: svgCode }}></svg> : undefined;
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

  const content = getSvgContentByPlaygroundType();

  return (
    <section className={`Preview Playground--${previewType}`}>
      <h2 className="visuallyhidden">Live demo</h2>
      <div className="Playground__image">
        <PlaygroundSwitcher />

        {previewType === 'edit' && <SvgCodeContainer value={content} />}

        <div className="Playground__svg-wrapper">
          {getTip(content)}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="Playground__svg"
          >
            <defs>
              <Filter />
            </defs>

            {content}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Preview;
