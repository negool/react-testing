import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form', () => {
  render(<App />);
  const fnLabel = screen.getByLabelText('First Name');
  console.log(fnLabel);
  expect(fnLabel).toBeInTheDocument();
});
