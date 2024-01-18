import React from 'react';
import { Counter, NewsBoard } from './demo';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe.skip('test Counter', () => {
  render(<Counter />);
  // screen.debug();

  it('initial', () => {
    const addBtn = screen.queryByTestId('add-btn');
    expect(addBtn).toBeInTheDocument();
    expect(addBtn).toHaveTextContent('1');
  });
});

describe('test NewsBoard', () => {
  it('NewsBoard first render', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            hits: [{ title: 'Free React.js Fundamentals Course', url: 'http://courses.reactjsprogram.com/courses/reactjsfundamentals' }],
          }),
      });
    }) as jest.Mock;
    render(<NewsBoard />);
    expect(await screen.findByText(/Free React.js/)).toBeInTheDocument();
    screen.debug();
  });
});
