import React from 'react';
import { Counter } from './demo';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Demo', () => {
  render(<Counter />);
  // screen.debug();

  it('initial', () => {
    const addBtn = screen.queryByTestId('add-btn');
    expect(addBtn).toBeInTheDocument();
    expect(addBtn).toHaveTextContent('1');
  });
});
