import './style/all.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import '@utils/one';

const root = createRoot(document.querySelector('#app'));

class Counter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  onAdd() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }
  render() {
    return <button onClick={() => this.onAdd()}>{this.state.count}</button>;
  }
}

const App = (props) => {
  return (
    <div>
      <p>{props.message}</p>
      <Counter />
    </div>
  );
};

App.propTypes = {
  message: PropTypes.string,
};

root.render(<App message="Hello" />);
