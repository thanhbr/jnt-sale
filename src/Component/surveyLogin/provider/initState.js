
import addressData from 'Pages/addressSeparationTool/_data.json'


export const transformAddressData = data => ({
  name: data?.name || '---',
  value: data?.id || '',
  list: data?.list,
})


export const provinceData = addressData.map(transformAddressData)

const initSurveyLoginState = {
  listBusiness:{},
  typeMajors: 0, //Default type 0 loại hình kinh doanh
  typeForm: 1, // 1: Form type business, 2: Form Infor
  dataAddress: {
    address: {
      value: '',
      province: {list: provinceData, keyword: '', value: null},
      district: {list: [], keyword: '', value: null},
      ward: {list: [], keyword: '', value: null},
    }
  },
  dataUpdate: {
    shopname: '',
    address: '',
    email: '',
    city_id: '',
    district_id: '',
    ward_id: '',
    business_major_id:'',
    is_default: 1
  }
}

export default initSurveyLoginState;