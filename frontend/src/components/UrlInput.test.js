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
  const textbox = screen.getByRole('textbox');

  userEvent.type(textbox, "htt");
  expect(textbox).toHaveClass('is-invalid');

  userEvent.clear(textbox);
  userEvent.type(textbox, "https://www.google.com");
  expect(textbox).not.toHaveClass('is-invalid');

  userEvent.clear(textbox);
  userEvent.type(textbox, "https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8");
  expect(textbox).not.toHaveClass('is-invalid');
});