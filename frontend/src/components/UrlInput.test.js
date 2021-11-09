import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UrlInput from './UrlInput';

test('renders the component successfully', () => {
  const placeholder = "Foo text";
  render(<UrlInput placeholder={placeholder} />);
  // expect(wrapper.state("isInvalid")).toEqual(false);

  const input = screen.getByPlaceholderText(placeholder);
  expect(input).toBeTruthy();
});

test('calls onSubmit handler on click', () => {
  let called = false;
  const onSubmit = () => {
    called = true;
  }
  render(<UrlInput onSubmit={onSubmit} />);
  userEvent.type(screen.getByRole('textbox'), "https://www.google.com");
  userEvent.click(screen.getByRole('button'));
  expect(called).toBe(true);
});

test('validates URL', () => {
  render(<UrlInput />);
  userEvent.type(screen.getByRole('textbox'), "htt");
  expect(screen.getByRole('textbox')).toHaveClass('is-invalid');
});