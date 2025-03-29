import React from 'react';
import ReactDOM from 'react-dom/client';
import Config from './config'; // Updated to use config.tsx

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Config />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found.');
}
