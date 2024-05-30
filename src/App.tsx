import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import './styles/App.css';
// used an external hosting to simplify and for scale
const backgroundImage = 'https://i.ibb.co/1dFp9Kf/default-Image.webp';

const App: React.FC = () => {
  const [clearFlag, setClearFlag] = useState(false);

  const handleExport = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = 'drawing.jpeg';
      link.click();
    }
  };

  const handleClear = () => {
    setClearFlag(true);
    setTimeout(() => setClearFlag(false), 0);
  };

  return (
    <div className='container'>
      <Canvas
        backgroundImage={backgroundImage}
        onClear={clearFlag}
      />
      <Toolbar
        onExport={handleExport}
        onClear={handleClear}
      />
    </div>
  );
};

export default App;
