
import { render, screen } from '@testing-library/react';
import { describe,it,  expect } from 'vitest';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
describe('App', () => {
  it('renders hello world text', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});