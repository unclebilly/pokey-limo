import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  fetch.mockResponse(
    JSON.stringify({ url: { shortened_url: "https://example.com/shortened" }})
  );
});

test('renders the app successfully', () => {
  render(<App />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test('renders the app with a shortened url', async () => {
  render(<App />);
  userEvent.type(screen.getByRole('textbox'), 'https://example.com');
  userEvent.click(screen.getByRole('button'));
  const shortened = await screen.findByText("https://example.com/shortened");
  expect(shortened).toBeInTheDocument();
});
