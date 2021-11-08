import { render, screen, fireEvent } from '@testing-library/react';
import UrlInput from './UrlInput';

test('renders the component successfully', () => {
  const placeholder = "Foo text";
  render(<UrlInput placeholder={placeholder} />);
  // expect(wrapper.state("isInvalid")).toEqual(false);

  const input = screen.getByPlaceholderText(placeholder);
  expect(input).toBeTruthy();
});

test('calls onSubmit handler', () => {
  let called = false;
  const onSubmit = () => {
    called = true;
  }
  const result = render(<UrlInput onSubmit={onSubmit} />);
  fireEvent.click(screen.getByRole('button'));
  expect(called).toBe(true);
});

test('validates URL', () => {
  render(<UrlInput />);
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: "htt" },
  });
  expect(screen.getByRole('textbox')).toHaveClass('is-invalid');
});