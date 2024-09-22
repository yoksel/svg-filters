import { useLocation } from 'react-router-dom';

const useSection = () => {
  const { pathname } = useLocation();
  const [section = 'playground', id] = pathname.replace(/^\//, '').split('/');
  return { section, id };
};

export default useSection;
