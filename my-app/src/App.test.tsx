import { render} from '@testing-library/react';
import { screen } from '@testing-library/react'

import App from './App';

test('renders hello world text', () => {
  render(<App />);
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});
