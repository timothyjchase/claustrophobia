import React from 'react'
import { Button, Checkbox } from 'semantic-ui-react'
import CheckTrogsPlacementStep from './index'

describe('<CheckTrogsPlacementStep />', () => {
  describe('with basic props', () => {
    const props = {
      completeThreatTrogsPlacementStep: jest.fn(),
    }
    const component = shallow(<CheckTrogsPlacementStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
    it('checkbox should change legalPlacement', () => {
      expect(component.state().legalPlacement).toEqual(false)
      component.find(Checkbox).prop('onChange')()
      expect(component.state().legalPlacement).toEqual(true)
    })
    it('button should completeThreatTrogsPlacementStep with legalPlacement', () => {
      const { legalPlacement } = component.state()
      component.find(Button).prop('onClick')()
      expect(props.completeThreatTrogsPlacementStep).toBeCalled()
      expect(props.completeThreatTrogsPlacementStep.mock.calls[0][0]).toBe(
        legalPlacement,
      )
    })
  })
})
