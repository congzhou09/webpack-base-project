import React from 'react';

type StateType = {
  count: number;
};

export class Counter extends React.PureComponent<unknown, StateType> {
  state = {
    count: 1,
  };
  onAdd() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }
  render() {
    return (
      <button data-testid="add-btn" onClick={() => this.onAdd()}>
        {this.state.count}
      </button>
    );
  }
}

// export default Counter;
