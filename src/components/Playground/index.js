import React from 'react';
import './Playground.css';
import PropTypes from 'prop-types';

import Filter from '../../containers/Filter';
import PlaygroundSwitcher from '../../containers/PlaygroundSwitcher';
import SvgCode from '../../containers/SvgCode';

import './gray-cells.png';

const Playground = ({
  filterId,
  playgroundType = 'image-and-text',
  svgCode
}) => {
  const filterUrl = filterId ? `url(#${filterId})` : '';

  const getTip = (content) => {
    let tipText = '';
    let modClassesList = ['Playground__tip'];

    if (!content) {
      tipText = 'Add some SVG';
      modClassesList.push('Playground__tip--add-content');
    } else if (!filterId && playgroundType === 'edit') {
      tipText = 'If the filter is empty, content may disappear. Add a primitive or choose a preset.';
      modClassesList.push('Playground__tip--add-primitives');
    }

    if (tipText) {
      return (
        <div className={modClassesList.join(' ')}>{tipText}</div>
      );
    }
  };

  const getSvgContentByPlaygroundType = () => {
    if (playgroundType === 'image') {
      return (
        <svg>
          <image
            x="10%" y="10%"
            width="80%" height="80%"
            preserveAspectRatio="xMidYMid slice"
            xlinkHref="https://source.unsplash.com/random/800x400?blossom"
            filter={filterUrl}
          />
        </svg>
      );
    }

    if (playgroundType === 'text') {
      return (
        <svg>
          <g filter={filterUrl}>
            <text
              x="50%" y="50%"
              dy=".35em"
              textAnchor="middle">Text</text>
          </g>
        </svg>
      );
    }

    if (playgroundType === 'edit') {
      return svgCode ? <svg dangerouslySetInnerHTML={{__html: svgCode}}></svg> : '';
    }

    return (
      <svg>
        <image
          x="10%" y="10%"
          width="80%" height="50%"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref="https://source.unsplash.com/random/800x400?blossom"
          filter={filterUrl}
        />

        <g filter={filterUrl}>
          <text
            x="50%" y="79%"
            dy=".35em"
            textAnchor="middle">Text</text>
        </g>
      </svg>
    );
  };

  const content = getSvgContentByPlaygroundType();

  return (
    <section className={`Playground Playground--${playgroundType}`}>
      <h2 className="visuallyhidden">Live demo</h2>
      <div className="Playground__image">
        <PlaygroundSwitcher/>

        {playgroundType === 'edit' && <SvgCode content={content}/>}

        <div className="Playground__svg-wrapper">

          {getTip(content)}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="Playground__svg"
          >

            <defs>
              <Filter/>
            </defs>

            {content}

          </svg>
        </div>
      </div>
    </section>
  );
};

export default Playground;

Playground.propTypes = {
  filterId: PropTypes.string,
  playgroundType: PropTypes.string
};
