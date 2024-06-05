import addressData from 'Pages/addressSeparationTool/_data.json'
import { transformAddressData } from '../utils/transform'

export const provinceData = addressData.map(transformAddressData)

export const initialState = {
  form: {
    info: {
      shopName: '',
      email: '',
      phone: '',
      suggestAddress: [],
      address: {
        value: '',
        province: {list: provinceData, keyword: '', value: null},
        district: {list: [], keyword: '', value: null},
        ward: {list: [], keyword: '', value: null},
      },
    },
  },
  validate: {},
  loading: false,
  skeleton: false,
  triggerCollectDefault: false,
}
