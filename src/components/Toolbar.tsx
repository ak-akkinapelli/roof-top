import React from 'react';

interface ToolbarProps {
  onExport: () => void;
  onClear: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onExport, onClear }) => {
  return (
    <div>
      <button onClick={onExport}>Export</button>
      <button onClick={onClear}>Clear</button>
    </div>
  );
};

export default Toolbar;
