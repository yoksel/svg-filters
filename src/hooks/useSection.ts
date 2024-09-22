import { useLocation } from 'react-router-dom';

const useSection = () => {
  const { pathname } = useLocation();
  const section = pathname.replaceAll('/', '') || 'playground';

  return section;
};

export default useSection;
