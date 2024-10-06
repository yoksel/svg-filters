import clsx from 'clsx';
import Filter from '../../../containers/Filter';
import PreviewTypeSwitcher from '../../../containers/PreviewTypeSwitcher';
import SvgCodeContainer from '../../../containers/SvgCode';

import './Preview.scss';

import './gray-cells.png';

interface PreviewProps {
  filterId?: string;
  previewType: string;
  customSvgCode: string;
}

const Preview = ({ filterId, previewType = 'image-and-text', customSvgCode }: PreviewProps) => {
  const filterUrl = filterId ? `url(#${filterId})` : '';

  const getTip = (hasContent?: boolean) => {
    let tipText = '';

    if (!content) {
      tipText = 'Add some SVG';
    } else if (!filterId && previewType === 'edit') {
      tipText =
        'If the filter is empty, content may disappear. Add a primitive or choose a preset.';
    }

    if (tipText) {
      return (
        <div
          className={clsx(
            'Preview__tip',
            content ? 'Preview__tip--add-primitives' : 'Preview__tip--add-content',
          )}
        >
          {tipText}
        </div>
      );
    }
  };

  const getSvgContentByPreviewType = (): JSX.Element | undefined => {
    if (previewType === 'edit') {
      return customSvgCode ? (
        <svg dangerouslySetInnerHTML={{ __html: customSvgCode }}></svg>
      ) : undefined;
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

  const content = getSvgContentByPreviewType();

  return (
    <section className={`Preview Preview--${previewType}`}>
      <h2 className="visuallyhidden">Live demo</h2>
      <div className="Preview__image">
        <PreviewTypeSwitcher />

        {previewType === 'edit' && <SvgCodeContainer value={content} />}

        <div className="Preview__svg-wrapper">
          {getTip(Boolean(content))}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="Preview__svg"
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
