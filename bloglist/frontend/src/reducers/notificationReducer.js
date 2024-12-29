import { createSlice } from '@reduxjs/toolkit'

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(notificationChange(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange: (state, action) => action.payload,
    clearNotification: () => '',
  },
})

export const { notificationChange, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
