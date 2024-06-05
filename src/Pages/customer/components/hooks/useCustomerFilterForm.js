import React, {useEffect, useRef, useState} from 'react'
import locationJsonData from '../../../addressSeparationTool/_data.json'
import {sendRequestAuth} from '../../../../api/api'
import config from '../../../../config'
import toast from '../../../../Component/Toast'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

const UseCustomerFilterForm = ({state, dispatch}) => {
  const cities = locationJsonData.map(item => item?.name)
  const [districts, setDistricts] = useState([])
  const [, setWards] = useState([])
  let [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [listGroupCustomer, setListGroupCustomer] = useState(
    state.groupCustomer,
  )
  const [listGroupDistrict, setListGroupDistrict] = useState([])
  const [listGroupWard, setListGroupWard] = useState([])
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [, setWard] = useState('')
  const [paramOld, setParamOld] = useState({
    keyword: '',
    group: '',
    city_id: '',
    district_id: '',
    ward_id: '',
    per_page: 20,
    start: 0,
  })
  const inputDistrictRef = useRef(null)

  useEffect(() => {
    const city =
      locationJsonData?.find(x => x.id === searchParams.get('city')) || {}
    const district =
      city?.list?.find(x => x.id === searchParams.get('district')) || {}
    const ward =
      district?.list?.find(x => x.id === searchParams.get('ward')) || {}


    setListGroupDistrict(city?.list?.map(x => x?.name) || [])
    setDistricts(city?.list?.map(x => x?.name) || [])
    setListGroupWard(district?.list?.map(x => x?.name) || [])
    dispatch({
      type: 'SET_GROUP_CITY',
      payload: cities,
    })
  }, [])

  const otherFilterBadge = [
    !!state.tag.group?.value,
    !!state.tag.city?.value,
    !!state.tag.district?.value,
    !!state.tag.ward?.value,
  ].filter(item => item === true).length

  // ======================GROUP CUSTOMER==============================
  const handleGroupCustomerSelected = data => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        group: {value: data.id, label: 'Nhóm khách hàng', name: data.name},
      },
    })
    dispatch({ type: 'HAS_FILTER' })
    setActiveCustomer(-1)
  }

  const handleGroupCustomerChange = data => {
    const customers = state.groupCustomer
    const group = customers.filter(customer => {
      const name = customer.name.toLowerCase().replace('đ', 'd')
      return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          data.value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim(),
        )
    })
    setListGroupCustomer(group)
    setActiveCustomer(-1)
  }

  const handleGroupBlur = data => {
    if (!!data.value) {
      const customers = state.groupCustomer
      const group = customers.filter(customer => {
        const name = customer.name.toLowerCase().replace('đ', 'd')
        return name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            data.value
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .trim(),
          )
      })
      if (group.length !== 0) {
        dispatch({
          type: 'SET_FILTER',
          payload: {
            group: {
              value: group[0].id,
              label: 'Nhóm khách hàng',
              name: group[0].name,
            },
          },
        })
        setActiveCustomer(-1)
      }
    }
  }

  const [activeCustomer, setActiveCustomer] = useState(-1)
  const handleKeywordKeyDown = data => {
    if (data.keyCode === 13 && !!data.value) {
      const customers = state.groupCustomer
      const group = customers.filter(customer => {
        const name = customer.name.toLowerCase().replace('đ', 'd')
        return name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            data.value
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .trim(),
          )
      })
      if (group.length !== 0) {
        document.getElementsByClassName('input__input')[2].focus()
        dispatch({
          type: 'SET_FILTER',
          payload: {
            group: {
              value: group[0].id,
              label: 'Nhóm khách hàng',
              name: group[0].name,
            },
          },
        })
      }
    }
    if(data.keyCode === 40 && activeCustomer < listGroupCustomer.length - 1) {
      setActiveCustomer(activeCustomer+1)
      dispatch({
        type: 'SET_FILTER',
        payload: {
          group: {value: listGroupCustomer[activeCustomer+1].id, label: 'Nhóm khách hàng', name: listGroupCustomer[activeCustomer+1].name},
        },
      })
    }
    if(data.keyCode === 38 && activeCustomer > 0) {
      setActiveCustomer(activeCustomer-1)
      dispatch({
        type: 'SET_FILTER',
        payload: {
          group: {value: listGroupCustomer[activeCustomer-1].id, label: 'Nhóm khách hàng', name: listGroupCustomer[activeCustomer-1].name},
        },
      })
    }
  }

  const handleKeywordReset = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        group: {value: '', label: 'Nhóm khách hàng', name: ''},
      },
    })
  }
  // ======================END GROUP CUSTOMER==============================

  // ======================CITY==============================
  const handleGroupCitySelected = val => {
    const selectedCity = locationJsonData.find(item => item?.name === val)
    const formatDistrictList = Array.isArray(selectedCity?.list)
      ? selectedCity.list.map(item => item?.name)
      : []

    setCity(val)
    setDistricts(formatDistrictList)
    setListGroupDistrict(formatDistrictList)
    dispatch({
      type: 'SET_FILTER',
      payload: {
        city: {value: selectedCity?.id, label: 'Tỉnh/Thành phố', name: val},
        district: {value: '', label: 'Quận/Huyện', name: ''},
        ward: {value: '', label: 'Phường/Xã', name: ''},
      },
    })
    dispatch({ type: 'HAS_FILTER' })
  }
  const handleGroupCityChange = data => {
    const result = cities.filter(city => {
      const removeDCity = city.toLowerCase().replace('đ', 'd')
      return removeDCity
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          data.value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim(),
        )
    })
    dispatch({
      type: 'SET_GROUP_CITY',
      payload: result,
    })
  }

  const handleGroupCityBlur = data => {
    if(!!data.value) {
      const selectedCity = locationJsonData.find(item => {
        const citySelected = item.name.toLowerCase().normalize('NFD').replace('đ', 'd').replace(/[\u0300-\u036f]/g, '')
        const name = data.value.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, '').replace('đ', 'd').trim()
        return citySelected.includes(name)
      })
      const formatDistrictList = Array.isArray(selectedCity?.list)
        ? selectedCity.list.map(item => item?.name)
        : []
      setCity(selectedCity?.name)
      setDistricts(formatDistrictList)
      setListGroupDistrict(formatDistrictList)
      if(!!selectedCity) {
        dispatch({
          type: 'SET_FILTER',
          payload: {
            city: {value: selectedCity?.id, label: 'Tỉnh/Thành phố', name: selectedCity?.name},
            district: {value: '', label: 'Quận/Huyện', name: ''},
            ward: {value: '', label: 'Phường/Xã', name: ''},
          },
        })
      }
    }
  }
  const handleGroupCityKeyDown = data => {
    if(data.keyCode === 13 && !!data.value) {
      const selectedCity = locationJsonData.find(item => {
        const name = data.value.toLowerCase().replace('đ', 'd')
        return item.name.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim())
      })
      const formatDistrictList = Array.isArray(selectedCity?.list)
        ? selectedCity.list.map(item => item?.name)
        : []
      setCity(selectedCity?.name)
      setDistricts(formatDistrictList)
      setListGroupDistrict(formatDistrictList)
      if(!!selectedCity) {
        document.getElementsByClassName('input__input')[3].focus()
        dispatch({
          type: 'SET_FILTER',
          payload: {
            city: {value: selectedCity?.id, label: 'Tỉnh/Thành phố', name: selectedCity?.name},
            district: {value: '', label: 'Quận/Huyện', name: ''},
            ward: {value: '', label: 'Phường/Xã', name: ''},
          },
        })
      }
    }
  }

  const handleGroupCityReset = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        city: {value: '', label: 'Tỉnh/Thành phố', name: ''},
        district: {value: '', label: 'Quận/Huyện', name: ''},
        ward: {value: '', label: 'Phường/Xã', name: ''},
      },
    })
  }
  // ======================END CITY==============================

  // ======================DISTRICT==============================
  const handleGroupDistrictSelected = val => {
    const selectedCity = locationJsonData.find(item => item?.name === city)
    const selectedDistrict = selectedCity?.list.find(item => item?.name === val)
    const formatWardList = Array.isArray(selectedDistrict?.list)
      ? selectedDistrict.list.map(item => item?.name)
      : []
    setDistrict(val)
    setWards(formatWardList)
    setListGroupWard(formatWardList)

    dispatch({
      type: 'SET_FILTER',
      payload: {
        district: {value: selectedDistrict?.id, label: 'Quận/Huyện', name: val},
      },
    })
    dispatch({
      type: 'SET_FILTER',
      payload: {ward: {value: '', label: 'Phường/Xã', name: ''}},
    })
    dispatch({ type: 'HAS_FILTER' })
  }
  const handleGroupDistrictChange = data => {
    const result = districts.filter(distr => {
      const removeDDistrict = distr.toLowerCase().replace('đ', 'd')
      return removeDDistrict
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          data.value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim(),
        )
    })
    setListGroupDistrict(result)
  }
  const handleGroupDistrictBlur = data => {
    if(!!data.value) {
      const selectedCity = locationJsonData.find(item => item?.name === city)
      const selectedDistrict = selectedCity?.list?.find(item => {
        const districtSelected = item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace('đ', 'd')
        const name = data.value.toLowerCase().replace('đ', 'd').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
        return districtSelected.includes(name)
      })
      const formatWardList = Array.isArray(selectedDistrict?.list)
        ? selectedDistrict?.list?.map(item => item?.name)
        : []
      setDistrict(selectedDistrict?.name)
      setWards(formatWardList)
      setListGroupWard(formatWardList)

      if(!!selectedDistrict) {
        dispatch({
          type: 'SET_FILTER',
          payload: {
            district: {value: selectedDistrict?.id, label: 'Quận/Huyện', name: selectedDistrict?.name},
          },
        })
        dispatch({
          type: 'SET_FILTER',
          payload: {ward: {value: '', label: 'Phường/Xã', name: ''}},
        })
      }
    }
  }
  const handleGroupDistrictKeyDown = data => {
    if(data.keyCode === 13 && !!data.value) {
      const selectedCity = locationJsonData.find(item => item?.name === city)
      const selectedDistrict = selectedCity.list.find(item => {

        const districtSelected = item.name.toLowerCase().normalize('NFD').replace('đ', 'd').replace(/[\u0300-\u036f]/g, '')
        const name = data.value.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, '').replace('đ', 'd').trim()
        return districtSelected.includes(name)
      })
      const formatWardList = Array.isArray(selectedDistrict?.list)
        ? selectedDistrict?.list?.map(item => item?.name)
        : []
      setDistrict(selectedDistrict?.name)
      setWards(formatWardList)
      setListGroupWard(formatWardList)
      if(!!selectedDistrict) {
        document.getElementsByClassName('input__input')[4].focus()
        dispatch({
          type: 'SET_FILTER',
          payload: {
            district: {value: selectedDistrict?.id, label: 'Quận/Huyện', name: selectedDistrict?.name},
          },
        })
        dispatch({
          type: 'SET_FILTER',
          payload: {ward: {value: '', label: 'Phường/Xã', name: ''}},
        })
      }
    }
  }

  const handleGroupDistrictReset = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        district: {value: '', label: 'Quận/Huyện', name: ''},
        ward: {value: '', label: 'Phường/Xã', name: ''},
      },
    })
  }
  // ======================END DISTRICT==============================

  // ======================WARD==============================
  const handleGroupWardSelected = val => {
    const selectedCity = locationJsonData.find(item => item?.name === city)
    const selectedDistrict = selectedCity?.list.find(
      item => item?.name === district,
    )
    const selectedWard = selectedDistrict?.list.find(item => item?.name === val)
    setWard(val)
    dispatch({
      type: 'SET_FILTER',
      payload: {ward: {value: selectedWard?.id, label: 'Phường/Xã', name: val}},
    })
    dispatch({ type: 'HAS_FILTER' })
  }
  const handleGroupWardChange = data => {
    const selectedCity = locationJsonData.find(item => item?.name === city)
    const selectedDistrict = selectedCity?.list.find(
      item => item?.name === district,
    )
    const formatWardList = Array.isArray(selectedDistrict?.list)
      ? selectedDistrict?.list?.map(item => item?.name)
      : []
    const result = formatWardList.filter(ward => {
      const removeDWard = ward.toLowerCase().replace('đ', 'd')
      return removeDWard
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          data.value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim(),
        )
    })
    setListGroupWard(result)
  }
  const handleGroupWardBlur = data => {
    if(!!data.value) {
      const selectedCity = locationJsonData.find(item => item?.name === city)
      const selectedDistrict = selectedCity?.list.find(
        item => item?.name === district,
      )
      const selectedWard = selectedDistrict?.list.find(item => {
        const wardSelect = item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace('đ', 'd')
        const name = data.value.toLowerCase().replace('đ', 'd').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
        return  wardSelect.includes(name)
      })
      if(!!selectedWard) {
        setWard(selectedWard?.name)
        dispatch({
          type: 'SET_FILTER',
          payload: {ward: {value: selectedWard?.id, label: 'Phường/Xã', name: selectedWard?.name}},
        })
      }
    }
  }
  const handleGroupWardKeyDown = data => {
    if(data.keyCode === 13 && !!data.value) {
      const selectedCity = locationJsonData.find(item => item?.name === city)
      const selectedDistrict = selectedCity?.list.find(
        item => item?.name === district,
      )
      const selectedWard = selectedDistrict?.list.find(item => {
        const name = data.value.toLowerCase().replace('đ', 'd')
        return item.name.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim())
      })
      if(!!selectedWard) {
        setWard(selectedWard?.name)
        dispatch({
          type: 'SET_FILTER',
          payload: {ward: {value: selectedWard?.id, label: 'Phường/Xã', name: selectedWard?.name}},
        })
      }
    }
  }
  const handleGroupWardReset = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        ward: {value: '', label: 'Phường/Xã', name: ''},
      },
    })
  }
  // ======================END WARD==============================

  const doFilter = async (filter, showLoading = true) => {
    const curFilter = filter || state.filter

    // when the passed param is unchanged, no request will be sent
    if (
      !filter &&
      paramOld.keyword === curFilter.keyword.value &&
      paramOld.group === curFilter.group.value &&
      paramOld.city_id === curFilter.city.value &&
      paramOld.district_id === curFilter.district.value &&
      paramOld.ward_id === curFilter.ward.value &&
      paramOld.per_page === curFilter.per_page.value &&
      paramOld.start === curFilter.start
    )
      return

    dispatch({type: 'SET_LOADING', payload: showLoading && true})
    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/customers?` +
        'keyword=' +
        curFilter.keyword.value +
        '&group=' +
        curFilter.group.value +
        '&city_id=' +
        curFilter.city.value +
        '&district_id=' +
        curFilter.district.value +
        '&ward_id=' +
        curFilter.ward.value +
        '&per_page=' +
        curFilter.per_page +
        '&start=' +
        curFilter.start,
    )

    setParamOld({
      keyword: curFilter.keyword.value,
      group: curFilter.group.value,
      city_id: curFilter.city.value,
      district_id: curFilter.district.value,
      ward_id: curFilter.ward.value,
      per_page: curFilter.per_page,
      start: curFilter.start,
    })
    if (response?.data && response?.data?.success) {
      dispatch({type: 'SET_LIST_CUSTOMER', payload: response.data.data})
      dispatch({
        type: 'SET_FILTER',
        payload: {...curFilter, start: 0, total: response.data.meta.total},
      })
      dispatch({
        type: 'SET_TAG',
        payload: {
          group: curFilter.group,
          city: curFilter.city,
          district: curFilter.district,
          ward: curFilter.ward,
        },
      })
      dispatch({type: 'SET_LOADING', payload: false})
      dispatch({type: 'SET_SHOW_TAG', payload: true})

      if(state.filter.group.value) dispatch({type: 'SET_FILTER', payload: {group: {value: state.filter.group.value, name: state.filter.group.name}}})
      if(state.filter.city.value) dispatch({type: 'SET_FILTER', payload: {city: {value: state.filter.city.value, name: state.filter.city.name}}})
      if(state.filter.district.value) dispatch({type: 'SET_FILTER', payload: {district: {value: state.filter.district.value, name: state.filter.district.name}}})
      if(state.filter.ward.value) dispatch({type: 'SET_FILTER', payload: {ward: {value: state.filter.ward.value, name: state.filter.ward.name}}})
    } else {
      toast.error('Lọc thất bại!')
    }
  }

  const handleDelete = async val => {
    let keyword = state?.filter?.keyword?.value || ''
    let group = state?.filter?.group?.value || ''
    let city_id = state?.filter?.city?.value || ''
    let district_id = state?.filter?.district?.value || ''
    let ward_id = state?.filter?.ward?.value || ''
    const per_page = state?.filter?.per_page || 20
    const start = state?.filter?.start || 0

    switch (val) {
      case 'group':
        group = ''
        dispatch({type: 'SET_FILTER', payload: {group: {value: ''}}})
        dispatch({type: 'SET_TAG', payload: {group: {value: ''}}})
        navigate({
          pathname: '/partner-management/customer',
          search: `?${createSearchParams({
            keyword: state.filter?.keyword?.value,
            group: '',
            city: state.filter?.city?.value,
            district: state.filter?.district?.value,
            ward: state.filter?.ward?.value,
            per_page: state.filter?.per_page,
            start: state.filter?.start,
          })}`,
        })
        break
      case 'city':
        city_id = ''
        setListGroupDistrict([])
        setListGroupWard([])
        dispatch({type: 'SET_FILTER', payload: {city: {value: '', name: ''}}})
        dispatch({type: 'SET_TAG', payload: {city: {value: ''}}})
        dispatch({type: 'SET_FILTER', payload: {district: {value: '', name: ''}}})
        dispatch({type: 'SET_TAG', payload: {district: {value: ''}}})
        dispatch({type: 'SET_FILTER', payload: {ward: {value: '', name: ''}}})
        dispatch({type: 'SET_TAG', payload: {ward: {value: ''}}})
        dispatch({type: 'SET_GROUP_CITY', payload: cities})
        navigate({
          pathname: '/partner-management/customer',
          search: `?${createSearchParams({
            keyword: state.filter?.keyword?.value,
            group: state.filter?.group?.value,
            city: '',
            district: '',
            ward: '',
            per_page: state.filter?.per_page,
            start: state.filter?.start,
          })}`,
        })
        break
      case 'district':
        district_id = ''
        dispatch({type: 'SET_FILTER', payload: {district: {value: '', name: ''}}})
        dispatch({type: 'SET_TAG', payload: {district: {value: ''}}})
        dispatch({type: 'SET_FILTER', payload: {ward: {value: '', name: ''}}})
        dispatch({type: 'SET_TAG', payload: {ward: {value: ''}}})
        setListGroupWard([])
        navigate({
          pathname: '/partner-management/customer',
          search: `?${createSearchParams({
            keyword: state.filter?.keyword?.value,
            group: state.filter?.group?.value,
            city: state.filter?.city?.value,
            district: '',
            ward: '',
            per_page: state.filter?.per_page,
            start: state.filter?.start,
          })}`,
        })
        break
      case 'ward':
        ward_id = ''
        dispatch({type: 'SET_FILTER', payload: {ward: {value: '', name: ''}}})
        dispatch({type: 'SET_TAG', payload: {ward: {value: ''}}})
        navigate({
          pathname: '/partner-management/customer',
          search: `?${createSearchParams({
            keyword: state.filter?.keyword?.value,
            group: state.filter?.group?.value,
            city: state.filter?.city?.value,
            district: state.filter?.district?.value,
            ward: '',
            per_page: state.filter?.per_page,
            start: state.filter?.start,
          })}`,
        })
        break
      default:
        return
    }

    dispatch({type: 'SET_LOADING', payload: true})
    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/customers?keyword=${keyword}&group=${group}&city_id=${city_id}&district_id=${district_id}&ward_id=${ward_id}&per_page=${per_page}&start=${start}`,
    )

    if (response?.data && response?.data?.success) {
      dispatch({type: 'SET_LIST_CUSTOMER', payload: response.data.data})
      dispatch({type: 'SET_FILTER', payload: {page: 0}})
      dispatch({type: 'SET_META', payload: {total: response.data.meta.total}})
      dispatch({type: 'SET_LOADING', payload: false})
      dispatch({type: 'SET_SHOW_TAG', payload: true})
    } else {
      toast.error('Lọc thất bại!')
    }
  }

  const handleDeleteAll = async () => {
    setListGroupDistrict([])
    setListGroupWard([])
    dispatch({type: 'SET_LOADING', payload: true})
    // dispatch({type: 'SET_SHOW_OTHER_FILTER'})
    const per_page = state?.filter?.per_page || 20
    const start = state?.filter?.start || 0
    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/customers?per_page=${per_page}&start=${start}`,
    )
    if (response?.data && response?.data?.success) {
      dispatch({
        type: 'SET_GROUP_CITY',
        payload: cities,
      })
      navigate({
        pathname: '/partner-management/customer',
        search: `?${createSearchParams({
          keyword: state?.filter?.keyword?.value || '',
          group: '',
          city: '',
          district: '',
          ward: '',
          per_page: '',
          start: '',
        })}`,
      })
      dispatch({type: 'SET_LIST_CUSTOMER', payload: response.data.data})
      dispatch({type: 'SET_META', payload: {total: response.data.meta.total}})
      dispatch({
        type: 'SET_FILTER',
        payload: {
          page: 0,
          group: {value: '', name: ''},
          city: {value: '', name: ''},
          district: {value: '', name: ''},
          ward: {value: '', name: ''},
        },
      })
      dispatch({
        type: 'SET_TAG',
        payload: {
          page: 0,
          group: {value: ''},
          city: {value: ''},
          district: {value: ''},
          ward: {value: ''},
        },
      })
      dispatch({type: 'SET_LOADING', payload: false})
      dispatch({type: 'CLEAR_HAS_FILTER', payload: false})
      dispatch({type: 'SET_SHOW_TAG', payload: true})
      setParamOld({
        group: '',
        city_id: '',
        district_id: '',
        ward_id: '',
      })
    } else {
      toast.error('Thất bại rồi nha!')
    }
  }
  const [debounceRefresh, setDebounceRefresh] = useState(true)
  const resetPage = async () => {
    if(debounceRefresh) {
      setDebounceRefresh(false)
      dispatch({type: 'CLOSE_OTHER_FILTER'})
      dispatch({type: 'SET_LOADING', payload: true})
      // dispatch({type: 'SET_SHOW_OTHER_FILTER'})

      const keyword = state?.filter?.keyword?.value || ''
      const group = state?.filter?.group?.value || ''
      const city_id = state?.filter?.city?.value || ''
      const district_id = state?.filter?.district?.value || ''
      const ward_id = state?.filter?.ward?.value || ''
      const per_page = state?.filter?.per_page || 20
      const start = searchParams.get('start') || 0
      const response = await sendRequestAuth(
        'get',
        `${config.API}/customer/customers?keyword=${keyword}&group=${group}&city_id=${city_id}&district_id=${district_id}&ward_id=${ward_id}&per_page=${per_page}&start=${start}`,
      )
      if (response?.data && response?.data?.success) {
        dispatch({type: 'SET_LIST_CUSTOMER', payload: response.data.data})
        dispatch({type: 'SET_META', payload: {total: response.data.meta.total}})
        // dispatch({type: 'SET_FILTER', payload: {page: 0}})
        dispatch({type: 'SET_LOADING', payload: false})
        dispatch({type: 'SET_SHOW_TAG', payload: true})
        navigate({
          pathname: '/partner-management/customer',
          search: `?${createSearchParams({
            keyword: keyword,
            group: group,
            city: city_id,
            district: district_id,
            ward: ward_id,
            per_page: per_page,
            start: start,
          })}`,
        })
      } else {
        toast.error('Thất bại rồi nha!')
      }

    setTimeout(() => {setDebounceRefresh(true)}, 2000)
    }
  }

  const canSubmitCustomerFilter = [
    JSON.stringify(state?.filter?.group?.value) !== JSON.stringify(state?.tag?.group?.value),
    JSON.stringify(state?.filter?.city?.value) !== JSON.stringify(state?.tag?.city?.value),
    JSON.stringify(state?.filter?.district?.value) !== JSON.stringify(state?.tag?.district?.value),
    JSON.stringify(state?.filter?.ward?.value) !== JSON.stringify(state?.tag?.ward?.value),
  ].includes(true)

  return {
    groupCustomer: {
      list: listGroupCustomer,
      value: state.filter.group.value,
      name: state.filter.group.name,
      onSelected: handleGroupCustomerSelected,
      onKeywordChange: handleGroupCustomerChange,
      onKeywordBlur: handleGroupBlur,
      onKeywordKeyDown: handleKeywordKeyDown,
      onKeywordReset: handleKeywordReset,
    },
    groupCity: {
      list: state.groupCity,
      value: state.filter.city.value,
      name: state.filter.city.name,
      onSelected: handleGroupCitySelected,
      onKeywordChange: handleGroupCityChange,
      onKeywordBlur: handleGroupCityBlur,
      onKeywordKeyDown: handleGroupCityKeyDown,
      onKeywordReset: handleGroupCityReset,
    },
    groupDistrict: {
      list: listGroupDistrict,
      value: state.filter.district.value,
      name: state.filter.district.name,
      onSelected: handleGroupDistrictSelected,
      onKeywordChange: handleGroupDistrictChange,
      onKeywordBlur: handleGroupDistrictBlur,
      onKeywordKeyDown: handleGroupDistrictKeyDown,
      onKeywordReset: handleGroupDistrictReset
    },
    groupWard: {
      list: listGroupWard,
      value: state.filter.ward.value,
      name: state.filter.ward.name,
      onSelected: handleGroupWardSelected,
      onKeywordChange: handleGroupWardChange,
      onKeywordBlur: handleGroupWardBlur,
      onKeywordKeyDown: handleGroupWardKeyDown,
      onKeywordReset: handleGroupWardReset
    },
    search: {
      value: state.filter.keyword.value,
    },
    functions: {
      doFilter,
      handleDelete,
      handleDeleteAll,
      resetPage,
    },
    countFilterCustomer: {
      otherFilterBadge,
    },
    ref: {
      inputDistrictRef
    },
    canSubmitCustomerFilter
  }
}

export default UseCustomerFilterForm
