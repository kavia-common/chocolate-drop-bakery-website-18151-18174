import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand name', () => {
  render(<App />);
  const brand = screen.getByText(/The Chocolate Drop/i);
  expect(brand).toBeInTheDocument();
});
