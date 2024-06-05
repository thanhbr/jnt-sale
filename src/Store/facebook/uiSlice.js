import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isFinished: false,
}

const uiSlice = createSlice({
  name: ' ui_slice',
  initialState,
  reducers: {
    //  add method
  },
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer
