import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';

const backgroundImage = 'src/assets/defaultImage.jpg';

const App: React.FC = () => {
  const [clearFlag, setClearFlag] = useState(false);

  const handleExport = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'drawing.png';
      link.click();
    }
  };

  const handleClear = () => {
    setClearFlag(true);
    setTimeout(() => setClearFlag(false), 0);
  };

  return (
    <div>
      <Toolbar
        onExport={handleExport}
        onClear={handleClear}
      />
      <Canvas
        backgroundImage={backgroundImage}
        onClear={clearFlag}
      />
    </div>
  );
};

export default App;
