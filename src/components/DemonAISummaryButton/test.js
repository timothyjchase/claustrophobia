import React from 'react'
import DemonAISummaryButton from './index'

describe('<DemonAISummaryButton />', () => {
  describe('with no props', () => {
    const component = shallow(<DemonAISummaryButton />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
