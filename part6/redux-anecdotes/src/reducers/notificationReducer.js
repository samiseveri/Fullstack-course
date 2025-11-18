const initialState = ''

const notificationReducer = (state=initialState, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION': return action.payload
    default: return state
  }
}

export const setNotification = message => ({ type:'SET_NOTIFICATION', payload:message })
export default notificationReducer
