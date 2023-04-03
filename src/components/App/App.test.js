import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders the dashboard UI', () => {
  render(<App />);
  const wrapper = screen.getByTestId('dashboard-wrapper');
  const sidebar = screen.getByTestId('dashboard-sidebar');
  const content = screen.getByTestId('dashboard-content');

  expect(wrapper).toBeInTheDocument();
  expect(sidebar).toBeInTheDocument();
  expect(content).toBeInTheDocument();
});
