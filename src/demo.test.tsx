import { Counter, NewsBoard } from './demo';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('test Counter', () => {
  beforeEach(() => {
    render(<Counter />);
  });

  it('initial', () => {
    const addBtn = screen.queryByTestId('add-btn');
    expect(addBtn).toBeInTheDocument();
    expect(addBtn).toHaveTextContent('1');
  });

  it('add-button click', async () => {
    const addBtn = screen.queryByTestId('add-btn');
    await userEvent.click(addBtn);
    expect(addBtn).toHaveTextContent('2');
  });
});

describe('test NewsBoard', () => {
  global.fetch = jest.fn((reqUrl) => {
    const searchStr = reqUrl.substring(reqUrl.indexOf('?query=') + 7);
    let resData = [{ title: 'my blog', url: 'https://congzhou09.github.io' }];
    if (searchStr.includes('react.js')) {
      resData = [{ title: 'Free React.js Fundamentals Course', url: 'http://courses.reactjsprogram.com/courses/reactjsfundamentals' }];
    }
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: resData,
        }),
    });
  }) as jest.Mock;

  beforeEach(async () => {
    await act(async () => {
      render(<NewsBoard />);
    });
  });

  it('first render', async () => {
    expect(await screen.findByText(/Free React.js/)).toBeInTheDocument();
    screen.debug();
  });

  it('search-btn click', async () => {
    const keywordInput = screen.getByTestId('keyword-input');
    await userEvent.clear(keywordInput);
    expect(keywordInput).toHaveValue('');
    await userEvent.click(screen.getByTestId('search-btn'));
    expect(await screen.findByText(/my blog/)).toBeInTheDocument();
    screen.debug();
  });
});
