import React, { useReducer } from 'react';

const initialState = { value: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { value: state.value + 1 };
    case 'subtract':
      return { value: state.value - 1 };
    default:
      return state;
  }
};

const Exercise7_19 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Counter Demo</h2>
      <p>Value: {state.value}</p>
      <button onClick={() => dispatch({ type: 'add' })}>Add</button>
      <button onClick={() => dispatch({ type: 'subtract' })}>Subtract</button>
    </div>
  );
};

export default Exercise7_19;
