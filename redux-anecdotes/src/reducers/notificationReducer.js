import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: "",
    reducers: {
      notificationChange(state, action) {
        state = action.payload
        return state
      },
      notificationReset(state, action){
          state = ""
          return state
      }
    }
  })
    export const { notificationChange, notificationReset } = notificationSlice.actions

    export const newNotification = (content, time) => {  
      return async dispatch => {       
        dispatch(notificationChange(content))
        setTimeout(() => {
          dispatch(notificationReset())
        }, time * 1000)  
      }}

    export default notificationSlice.reducer