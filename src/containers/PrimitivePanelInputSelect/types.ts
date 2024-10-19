import { PrimitivesSections } from '../../store/types';

export interface InitialProps {
  id: string;
  parentId?: string;
  param: string;
  value: string;
  section: keyof PrimitivesSections;
}

export interface Dependency {
  enable: [];
  disable: [];
  value: string;
}
