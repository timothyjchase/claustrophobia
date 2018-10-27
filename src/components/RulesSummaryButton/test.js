import React from 'react'
import RulesSummaryButton from './index'

describe('<RulesSummaryButton />', () => {
  describe('with no props', () => {
    const component = shallow(<RulesSummaryButton />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
