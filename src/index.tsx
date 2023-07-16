import React from 'react';
import ReactDOM from 'react-dom/client';
import Profile from './Profile';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Profile></Profile>
  </React.StrictMode>
);
