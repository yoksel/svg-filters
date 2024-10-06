import { renderToString } from 'react-dom/server';

const markupToString = (component?: JSX.Element) => {
  if (!component) return '';

  const elementString = renderToString(component);

  const markupString = elementString
    // remove previous formatting
    .replaceAll(/\n|\t/g, '')
    // add proper formatting
    .replace('<image', '\n\t<image')
    .replace('<g', '\n\n\t<g')
    .replace('</g', '\n\t</g')
    .replace('<text', '\n\t\t<text')
    .replace('</svg', '\n</svg');

  return markupString;
};

export default markupToString;
