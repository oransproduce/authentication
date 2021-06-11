import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import ProvideAuth from './components/ProvideAuth';

const toRender = (
  <ProvideAuth>
    <App />
  </ProvideAuth>
);

render(toRender, document.getElementById('app'));
