import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const good = useSelector(state => state.good)
  const ok   = useSelector(state => state.ok)
  const bad  = useSelector(state => state.bad)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset</button>

      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>ok: {ok}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

export default App
