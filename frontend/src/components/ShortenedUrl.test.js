import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShortenedUrl from './ShortenedUrl';

let textWritten = null;

beforeEach(() => {

  fetch.mockResponse(
    JSON.stringify({ url: { shortened_url: "https://example.com/shortened" }})
  );

  textWritten = null;

  // Mock the browser "copy to clipboard" function
  Object.assign(navigator, {
    clipboard: {
      writeText: (txt) => {
        textWritten = txt;
      }
    }
  });
});

test('calls onAnotherClicked handler', () => {
  let called = false;
  const onAnotherClicked = () => {
    called = true;
  }
  render(<ShortenedUrl onAnotherClicked={onAnotherClicked} />);
  userEvent.click(screen.getByText('Shorten Another URL'));
  expect(called).toBe(true);
});

test('fetches a shortened url', async() => {
  await render(<ShortenedUrl onAnotherClicked={() => {}}
                        urlToShorten="https://example.com/long" />);
  const display = await screen.findByText("https://example.com/shortened");
  expect(display).toBeInTheDocument();
});

test('does something reasonable when the service is down', async() => {
  const errMess = "An error occurred. Please try again later.";
  fetch.mockReject(() => Promise.reject("500 internal error that user shouldn't read"));
  await render(<ShortenedUrl onAnotherClicked={() => {}}
                        urlToShorten="https://example.com/fail" />);
  const display = await screen.findByText(errMess);
  expect(display).toBeInTheDocument();
});

test('copies URL to clipboard', async() => {
  await render(<ShortenedUrl onAnotherClicked={() => {}}
                        urlToShorten="https://example.com/long" />);
  const display = await screen.findByText("https://example.com/shortened");
  userEvent.click(screen.getByText("Copy"));
  const button = await screen.findByText("Copied!")
  expect(display).toBeInTheDocument();
  expect(textWritten).toEqual("https://example.com/shortened");
});