import PrimitivePanelControl from './PrimitivePanelControl';

const DocsButton = ({ toggleDocs }: { toggleDocs: () => void }) => (
  <PrimitivePanelControl
    type="docs"
    title="Show documentation for this primitive"
    symbol="doc"
    onClick={toggleDocs}
  />
);

export default DocsButton;
