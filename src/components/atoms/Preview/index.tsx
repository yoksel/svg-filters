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
  toggleEditPanel: (value: boolean) => void;
}

const Preview = ({
  filterId,
  previewType = 'image-and-text',
  customSvgCode,
  toggleEditPanel,
}: PreviewProps) => {
  const filterUrl = filterId ? `url(#${filterId})` : '';

  const Tip = ({ noContent, noFilter }: { noContent?: boolean; noFilter?: boolean }) => {
    if (noContent) {
      return (
        <button
          className="Preview__tip Preview__tip--add-svg-content"
          onClick={() => toggleEditPanel(true)}
        >
          Add some SVG
        </button>
      );
    }

    if (noFilter) {
      return (
        <div className="Preview__tip Preview__tip--add-primitives">
          If the filter is empty, content may disappear. Add a primitive or choose a preset.
        </div>
      );
    }

    return null;
  };

  const getSvgContentByPreviewType = (): JSX.Element | undefined => {
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

  const content = getSvgContentByPreviewType();

  return (
    <section className={`Preview Preview--${previewType}`}>
      <h2 className="visually-hidden">Live demo</h2>
      <div className="Preview__image">
        <PreviewTypeSwitcher />

        {previewType === 'edit' && <SvgCodeContainer />}

        <div className="Preview__svg-wrapper">
          <Tip noContent={!Boolean(content)} noFilter={!filterId && previewType === 'edit'} />

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
