import Filter from '../../../containers/Filter';
import PlaygroundSwitcher from '../../../containers/PlaygroundSwitcher';
import SvgCodeContainer from '../../../containers/SvgCode';

import './Playground.scss';

import './gray-cells.png';

interface PlaygroundProps {
  filterId?: string;
  playgroundType: string;
  svgCode: string;
}

const Playground = ({ filterId, playgroundType = 'image-and-text', svgCode }: PlaygroundProps) => {
  const filterUrl = filterId ? `url(#${filterId})` : '';

  const getTip = (content?: ReturnType<typeof getSvgContentByPlaygroundType>) => {
    let tipText = '';
    let modClassesList = ['Playground__tip'];

    if (!content) {
      tipText = 'Add some SVG';
      modClassesList.push('Playground__tip--add-content');
    } else if (!filterId && playgroundType === 'edit') {
      tipText =
        'If the filter is empty, content may disappear. Add a primitive or choose a preset.';
      modClassesList.push('Playground__tip--add-primitives');
    }

    if (tipText) {
      return <div className={modClassesList.join(' ')}>{tipText}</div>;
    }
  };

  const getSvgContentByPlaygroundType = () => {
    if (playgroundType === 'image') {
      return (
        <svg>
          <image
            x="10%"
            y="10%"
            width="80%"
            height="80%"
            preserveAspectRatio="xMidYMid slice"
            xlinkHref="https://placekitten.com/800/400"
            filter={filterUrl}
          />
        </svg>
      );
    }

    if (playgroundType === 'text') {
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

    if (playgroundType === 'edit') {
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
          xlinkHref="https://placekitten.com/800/400"
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
    <section className={`Playground Playground--${playgroundType}`}>
      <h2 className="visuallyhidden">Live demo</h2>
      <div className="Playground__image">
        <PlaygroundSwitcher />

        {playgroundType === 'edit' && <SvgCodeContainer value={content} />}

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

export default Playground;
