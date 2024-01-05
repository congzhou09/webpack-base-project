import React from 'react';
import { Counter } from './demo';
import { render, screen } from '@testing-library/react';

describe('Demo', () => {
  it('renders Counter component', () => {
    render(<Counter />);
    screen.debug();
  });
});
