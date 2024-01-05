import React from 'react';

type StateType = {
  count: number;
};

export class Counter extends React.PureComponent<unknown, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
    console.log('this.state', this.state);
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

// export default Counter;
