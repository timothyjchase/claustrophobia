import React from 'react'
import DieImage from './index'

describe('<DieImage />', () => {
  describe('with type = DEMON, value = 1', () => {
    const component = shallow(<DieImage type="DEMON" value={1} />)
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with type = DEMON, value = 0', () => {
    const component = shallow(<DieImage type="DEMON" value={0} />)
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with type = DEMON, value = 7', () => {
    const component = shallow(<DieImage type="DEMON" value={7} />)
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with type = THREAT, value = 1', () => {
    const component = shallow(<DieImage type="THREAT" value={1} />)
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
