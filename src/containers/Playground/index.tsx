import { useSelector } from 'react-redux';
import PlaygroundTemplate from '../../components/atoms/Playground';
import { RootState } from '../../store';

interface PlaygroundProps {
  section?: string;
}

const Playground = ({ section = 'playground' }: PlaygroundProps) => {
  const playgroundType = useSelector((state: RootState) => state.playground.type);
  const svgCode = useSelector((state: RootState) => state.playground.svgCode);

  return (
    <PlaygroundTemplate
      // filterId={state.primitives[section].length ? 'filter' : ''}
      playgroundType={playgroundType}
      svgCode={svgCode}
    />
  );
};

export default Playground;
