import React from 'react'
import RulesSummaryButton from './index'

describe('<RulesSummaryButton />', () => {
  describe('with no props', () => {
    const component = shallow(<RulesSummaryButton />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
    it('handleOpen changes state to open = true', () => {
      component.instance().handleOpen()
      expect(component.state().open).toEqual(true)
    })
    it('handleClose changes state to open = false', () => {
      component.instance().handleClose()
      expect(component.state().open).toEqual(false)
    })
  })
})
