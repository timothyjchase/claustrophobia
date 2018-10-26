import { configure, shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// React 16 Enzyme adapter
configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.mount = mount

const { error } = console
// eslint-disable-next-line no-console
console.error = (warning, ...args) => {
  if (/(Invalid prop|Failed prop type)/gi.test(warning)) {
    throw new Error(warning)
  }
  error.apply(console, [warning, ...args])
}
