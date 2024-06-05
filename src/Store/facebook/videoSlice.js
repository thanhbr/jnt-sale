import {createSlice} from '@reduxjs/toolkit'
import {dummyVideos} from './dummyVideos'
import {
  dummyStoreList,
  dummyPriceList,
  deliveryPartners,
  dummyShippingList,
  districtList,
  wardList,
} from './dummySelectLists'

const initialState = {
  listVideos: dummyVideos,
  listDefaultStores: dummyStoreList,
  listDefaultPrice: dummyPriceList,
  listDeliveryPartner: deliveryPartners,
  listShippingAddress: dummyShippingList,
  listDistrict: districtList,
  listWard: wardList,
  // pageInfo: [],
}

const videoSlice = createSlice({
  name: ' video_slice',
  initialState,
  reducers: {},
})

export const videoActions = videoSlice.actions
export default videoSlice.reducer
