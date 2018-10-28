import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import Welcome from './index'

describe('<Welcome />', () => {
  describe('with basic props', () => {
    const props = {
      startGame: jest.fn(),
    }
    const component = shallow(<Welcome {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
    it('dropdown should change scenarioKey', () => {
      expect(component.state().scenarioKey).toEqual(undefined)
      component.find(Dropdown).prop('onChange')({}, { value: 'TEST_SCENARIO' })
      expect(component.state().scenarioKey).toEqual('TEST_SCENARIO')
    })
    it('button should completeThreatSpawnTrogsStep with trogsAdded', () => {
      const { scenarioKey } = component.state()
      component.find(Button).prop('onClick')()
      expect(props.startGame).toBeCalled()
      expect(props.startGame.mock.calls[0][0]).toBe(scenarioKey)
    })
  })
})
