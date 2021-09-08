import './style/all.css';
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

const App = (props) => {
  return <p>{props.message}</p>;
};

App.propTypes = {
  message: PropTypes.string
};

ReactDom.render(<App message="Hello" />, document.querySelector('#app'));
