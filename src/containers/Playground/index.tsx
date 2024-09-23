import { useSelector } from 'react-redux';
import Playground from '../../components/atoms/Playground';
import { RootState } from '../../store';
import useSection from '../../hooks/useSection';

const PlaygroundContainer = () => {
  const { section } = useSection();
  const playgroundType = useSelector((state: RootState) => state.playground.type);
  const svgCode = useSelector((state: RootState) => state.playground.svgCode);
  const primitives = useSelector((state: RootState) => state.primitives[section]);

  return (
    <Playground
      filterId={primitives ? 'filter' : ''}
      playgroundType={playgroundType}
      svgCode={svgCode}
    />
  );
};

export default PlaygroundContainer;
