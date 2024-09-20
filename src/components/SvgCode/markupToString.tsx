import React from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

const markupToString = (component?: JSX.Element) => {
  if (!component) return '';

  const div = document.createElement('div');
  const root = createRoot(div);
  const Component = () => component;
  flushSync(() => {
    root.render(
      <>
        <Component />
      </>,
    );
  });

  const markupString = div.innerHTML
    .replace('<image', '\n\t<image')
    .replace('<g', '\n\n\t<g')
    .replace('</g', '\n\t</g')
    .replace('<text', '\n\t\t<text')
    .replace('</svg', '\n</svg');

  return markupString;
};

export default markupToString;
