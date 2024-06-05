export const InitialState = {
  isLoading: true,
  titleSeaching:'Bạn chưa có điểm gửi hàng nào',
  meta: {
    start: 0,
    per_page: 20,
    total:20,
  },
  idAddress: [],
  status: 1,
  isDefaultAddress: 0,
  isHiddenAddress: 0,
  isHiddenPhone: 0,
  isHiddenProvinceDistrict: 0,
  getIdInfo: 0,
  getConsignment: [],
  searching: [],
  getInfoConsigment: [],
  getAreas: [],
  getprovices: [],
  getDistrict: [],
  getWards: [],
  getProvice_districts: [],
  provinces: [],
  city: {},
  cityId: {},
  district: {},
  districtId: {},
  ward: {},
  wardId: {},
  success:true,
  numberAddress: '',
  validName: {
    valid:false,
    error:''
  },
  validPhone: {
    valid:false,
    error:''
  },
  validEmail: {
    valid:false,
    error:''
  },
  validCity: {
    valid:false,
    error:''
  },
  validDistrict: {
    valid:false,
    error:''
  },
  validWard: {
    valid:false,
    error:''
  },
  validAddress:{
    valid:false,
    error:''
  },
  confirm:false,
  value_search:'',
}