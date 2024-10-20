import { NavLink } from 'react-router-dom';
import { DocData } from '../../../store/types';

interface DocsLinksProps {
  currentDocLink?: DocData['link'];
  isEmbedded?: boolean;
  docId: string;
  toggleDocs: () => void;
}

const DocsLinks = ({ currentDocLink, isEmbedded, docId, toggleDocs }: DocsLinksProps) => {
  return (
    <div className="Docs__links">
      <a className="Docs__link" href={currentDocLink} target="_blank" rel="noopener noreferrer">
        Specification
      </a>
      {isEmbedded && (
        <NavLink className="Docs__link Docs__link--docs" to={`/docs/${docId}`} onClick={toggleDocs}>
          View in docs
        </NavLink>
      )}
    </div>
  );
};
export default DocsLinks;
