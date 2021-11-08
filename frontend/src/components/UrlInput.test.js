import { screen } from '@testing-library/react';
import UrlInput from './UrlInput';
import { shallow, mount, render} from "enzyme";

test('renders the component successfully', () => {
  const placeholder = "Foo text";
  const wrapper = render(<UrlInput placeholder={placeholder} />);
  // expect(wrapper.state("isInvalid")).toEqual(false);

  expect(wrapper.find("input")).toHaveTextContent(placeholder);
});

test('calls onSubmit handler', () => {
  let called = false;
  const onSubmit = () => {
    called = true;
  }
  const wrapper = mount(<UrlInput onSubmit={onSubmit} />);
  wrapper.find("button").simulate('click');
  expect(called).toBe(true);
});
