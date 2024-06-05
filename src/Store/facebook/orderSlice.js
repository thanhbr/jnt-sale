import {createSlice} from '@reduxjs/toolkit'
import items from './dummyProducts'

const initialState = {
  items,
  isError: false,
}

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    add(state, action) {
      const addedItem = action.payload
      // console.log(addedItem)
      const existingItem = state.items.find(item => item.id === addedItem.id)
      if (!existingItem) {
        state.isError = true
      } else {
        existingItem.defaultAmount = addedItem.defaultAmount
      }
    },
    minus(state, action) {
      const minusItem = action.payload
      // console.log(minusItem)
      const existingItem = state.items.find(item => item.id === minusItem.id)
      if (!existingItem) {
        state.isError = true
      } else {
        existingItem.defaultAmount = minusItem.defaultAmount
      }
    },
    remove(state, action) {
      const id = action.payload
      // console.log(id)
      if (!id) state.isError = true
      state.items = state.items.filter(item => item.id !== id)
    },
  },
})

export const orderActions = orderSlice.actions
export default orderSlice.reducer
