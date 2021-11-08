import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, mount} from "enzyme";

test('renders the app successfully', () => {
  mount(<App />);
});
