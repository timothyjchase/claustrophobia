import React from 'react'
import { Button } from 'semantic-ui-react'
import CheckTrogsDistanceStep from './index'

describe('<CheckTrogsDistanceStep />', () => {
  describe('with basic props', () => {
    const props = {
      completeThreatTrogsDistanceStep: jest.fn(),
    }
    const component = shallow(<CheckTrogsDistanceStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
    it('trogsFar checkbox should change trogsFar', () => {
      expect(component.state().trogsFar).toEqual(false)
      component.find({ id: 'trogsFar' }).prop('onChange')()
      expect(component.state().trogsFar).toEqual(true)
    })
    it('trogsClose checkbox should change trogsClose', () => {
      expect(component.state().trogsClose).toEqual(false)
      component.find({ id: 'trogsClose' }).prop('onChange')()
      expect(component.state().trogsClose).toEqual(true)
    })
    it('button should completeThreatTrogsDistanceStep with trogsFar and trogsClose', () => {
      const { trogsFar, trogsClose } = component.state()
      component.find(Button).prop('onClick')()
      expect(props.completeThreatTrogsDistanceStep).toBeCalled()
      expect(props.completeThreatTrogsDistanceStep.mock.calls[0][0]).toBe(
        trogsFar,
      )
      expect(props.completeThreatTrogsDistanceStep.mock.calls[0][1]).toBe(
        trogsClose,
      )
    })
  })
})
