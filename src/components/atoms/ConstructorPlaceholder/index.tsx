import './ConstructorPlaceholder.scss';

const text = {
  playground: 'Drag primitives here to create filter',
  presets: 'Choose a preset to play with its primitives',
  docs: 'Choose primitive to see docs and live demos'
};

const ConstructorPlaceholder = ({section = 'playground'}: {section: keyof typeof text }) => {

  return (
    <div
      className="ConstructorPlaceholder"
      dangerouslySetInnerHTML={{__html: text[section]}}>
    </div>
  );
}

export default ConstructorPlaceholder;
