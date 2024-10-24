import { useLocation } from 'react-router-dom';
import { Section, SectionEnum } from '../store/types';

const isSectionValid = (section: string): section is keyof typeof SectionEnum => {
  return section in SectionEnum;
};

const useSection = (): { section: Section; id?: string } => {
  const { pathname } = useLocation();
  const [section, id] = pathname.replace(/^\//, '').split('/');

  return {
    section: isSectionValid(section) ? section : 'playground',
    id,
  };
};

export default useSection;
