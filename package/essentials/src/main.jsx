import './style/all.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import '@utils/one';
import { Counter, NewsBoard } from './demo';

const root = createRoot(document.querySelector('#app'));

const App = (props) => {
  return (
    <div>
      <p>{props.message}</p>
      <Counter />
      <NewsBoard />
    </div>
  );
};

App.propTypes = {
  message: PropTypes.string,
};

root.render(<App message="Hello" />);
