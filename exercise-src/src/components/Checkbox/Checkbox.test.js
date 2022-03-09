import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const clickFn = jest.fn();
    render(<Checkbox
      id="cb1"
      name="cb1"
      label="My Checkbox"
      checked={true}
      onChange={clickFn}
    />);
    const input = screen.getByLabelText('My Checkbox');
    const label = screen.getByText('My Checkbox');

    expect(label.getAttribute('for')).toEqual(input.getAttribute('id'));
    expect(input.getAttribute('type')).toBe('checkbox');
    expect(input.checked).toEqual(true);
  });

  it('spreads custom attributes', () => {
    const clickFn = jest.fn();
    render(<Checkbox
      id="cb2"
      name="cb2"
      label="My Checkbox"
      data-foo="test"
      onChange={clickFn}
    />);

    const input = screen.getByLabelText('My Checkbox');
    expect(input.getAttribute('data-foo')).toBe('test');

    fireEvent.click(input);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });
  it('gets checked on click', () => {
    const clickFn = jest.fn();
    render(<Checkbox
      id="cb3"
      name="cb3"
      label="My Checkbox"
      onChange={clickFn}
    />);

    const input = screen.getByLabelText('My Checkbox');

    fireEvent.click(input);
    expect(clickFn).toHaveBeenCalledTimes(1);
  })
});
