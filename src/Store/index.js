import {configureStore} from '@reduxjs/toolkit'
import videoReducer from './facebook/videoSlice'
import uiReducer from './facebook/uiSlice'
import orderReducer from './facebook/orderSlice'
const store = configureStore({
  reducer: {
    videos: videoReducer,
    ui: uiReducer,
    order: orderReducer,
  },
})
export default store
