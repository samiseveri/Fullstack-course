import deepFreeze from 'deep-freeze'
import reducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('returns proper initial state', () => {
    const action = { type: 'DO_NOTHING' }
    const newState = reducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('GOOD increments', () => {
    const action = { type: 'GOOD' }
    const state = initialState
    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 })
  })
})
