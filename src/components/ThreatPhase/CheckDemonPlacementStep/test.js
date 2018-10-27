import React from 'react'
import { Button, Checkbox } from 'semantic-ui-react'
import CheckDemonPlacementStep from './index'

describe('<CheckDemonPlacementStep />', () => {
  describe('with basic props', () => {
    const props = {
      completeThreatDemonPlacementStep: jest.fn(),
    }
    const component = shallow(<CheckDemonPlacementStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
    it('checkbox should change legalPlacement', () => {
      expect(component.state().legalPlacement).toEqual(false)
      component.find(Checkbox).prop('onChange')()
      expect(component.state().legalPlacement).toEqual(true)
    })
    it('button should completeThreatDemonPlacementStep with legalPlacement', () => {
      const { legalPlacement } = component.state()
      component.find(Button).prop('onClick')()
      expect(props.completeThreatDemonPlacementStep).toBeCalled()
      expect(props.completeThreatDemonPlacementStep.mock.calls[0][0]).toBe(
        legalPlacement,
      )
    })
  })
})
