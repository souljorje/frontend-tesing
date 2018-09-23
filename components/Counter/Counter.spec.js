import { mount } from '@vue/test-utils';
import Counter from './Counter';

describe('Counter', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Counter);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  test('renders correctly', () => {
    const wrapper = mount(Counter);
    expect(wrapper.element).toMatchSnapshot();
  });
});
