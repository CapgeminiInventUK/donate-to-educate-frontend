import React, { useState } from 'react';
import DevPreview from '../../pages/DevPreview/DevPreview';
import App from '../App/App';

const RootComponent: React.FC = (): JSX.Element => {
  const [showApp, setShowApp] = useState(false);

  const handleButtonClick = (): void => {
    setShowApp(true);
  };

  if (showApp) {
    return <App />;
  }

  return (
    <div>
      <h1>Development Preview</h1>
      <button onClick={handleButtonClick}>Go to App</button>
      <DevPreview />
    </div>
  );
};

export default RootComponent;
