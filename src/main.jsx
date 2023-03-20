import './style/all.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import '@utils/one';

const root = createRoot(document.querySelector('#app'));

const App = (props) => {
  return <p>{props.message}</p>;
};

App.propTypes = {
  message: PropTypes.string,
};

root.render(<App message="Hello" />);
