import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/changeValues';
import Display from './components/display';
import Visual from './components/visual';
import ChangeValues from './components/changeValues';

const Config: React.FC = () =>
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(Home) }),
      React.createElement(Route, { path: '/display', element: React.createElement(Display) }),
      React.createElement(Route, { path: '/visual', element: React.createElement(Visual) }),
      React.createElement(Route, { path: '/changeValues', element: React.createElement(ChangeValues) })
    )
  );

export default Config;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(Config));
} else {
  console.error('Container element not found.');
  // handle the error.
}
