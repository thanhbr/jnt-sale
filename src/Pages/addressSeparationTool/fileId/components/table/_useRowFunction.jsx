import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {AddressSeparationSingleFileContext} from '../..'
import locationJsonData from '../../../_data.json'
import {singleActions} from '../../_singleReducer'

const useRowFunction = ({data}) => {
  const params = useParams()

  const {showAlert} = useAlert()

  const {pageState, pageDispatch} = useContext(
    AddressSeparationSingleFileContext,
  )
  const {failedData, successData, edit, tab} = pageState

  const currentProvince = locationJsonData.find(
    item => item?.name === data?.city_name,
  )
  const defaultDistrict = currentProvince
    ? Array.isArray(currentProvince?.list)
      ? currentProvince.list.map(item => item?.name)
      : []
    : []
  const currentDistrict = currentProvince?.list
    ? currentProvince.list.find(item => item?.name === data?.district_name)
    : []
  const defaultTown = currentDistrict
    ? Array.isArray(currentDistrict?.list)
      ? currentDistrict.list.map(item => item?.name)
      : []
    : []

  const [shouldFocusAddressInput, setShouldFocusAddressInput] = useState(false)

  const [tmpAddress, setTmpAddress] = useState(data?.address || '')
  const [address, setAddress] = useState(tmpAddress)
  const [tmpProvince, setTmpProvince] = useState(data?.city_name || '')
  const [province, setProvince] = useState(tmpProvince)
  const [tmpDistrict, setTmpDistrict] = useState(data?.district_name || '')
  const [district, setDistrict] = useState(tmpDistrict)
  const [tmpTown, setTmpTown] = useState(data?.ward_name || '')
  const [town, setTown] = useState(tmpTown)
  const [triggerUpdate, setTriggerUpdate] = useState(true)

  const [districtData, setDistrictData] = useState(defaultDistrict)
  const [townData, setTownData] = useState(defaultTown)

  const [suggestData, setSuggestData] = useState([])

  const canEdit = edit?.id === data?.id
  const canSubmit =
    (province !== tmpProvince ||
      district !== tmpDistrict ||
      town !== tmpTown) &&
    (tab?.active === 'success' ? address && province && district && town : true)
  const isReported = data?.is_reported === '1'

  const handleEdit = () =>{
    setErrorSeparate(false)
    pageDispatch({type: singleActions.ROW_EDIT, payload: {id: data?.id}})
  }

  const handleEditReset = (changeItem = false) => {
    setAddress(tmpAddress || '')
    setProvince(tmpProvince || '')
    setDistrict(tmpDistrict || '')
    setTown(tmpTown || '')

    setDistrictData(defaultDistrict)
    setTownData(defaultTown)

    setSuggestData([])

    if (!changeItem) pageDispatch({type: singleActions.ROW_EDIT_RESET})
  }

  const handleInputFocus = () => {
    if (edit?.warning && province && district && town)
      pageDispatch({
        type: singleActions.ROW_EDIT_WARNING_EMPTY,
        payload: {warning: false},
      })
  }

  const [errorSeparate, setErrorSeparate] = useState(false)
  const handleSeparateAddress = async (customAddress = '') => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/detect-address?address=${customAddress || address}`,
    )

    if (!!response?.data?.success) {
      const reponseProvince = locationJsonData.find(
        item => item?.name === response?.data?.data?.city_name,
      )
      const targetDistrict = reponseProvince
        ? Array.isArray(reponseProvince?.list)
          ? reponseProvince.list.map(item => item?.name)
          : []
        : []
      const responseDistrict = reponseProvince?.list
        ? reponseProvince.list.find(
            item => item?.name === response?.data?.data?.district_name,
          )
        : []
      const targetTown = responseDistrict
        ? Array.isArray(responseDistrict?.list)
          ? responseDistrict.list.map(item => item?.name)
          : []
        : []

      setProvince(response?.data?.data?.city_name || '')
      setDistrict(response?.data?.data?.district_name || '')
      setTown(response?.data?.data?.ward_name || '')

      setDistrictData(targetDistrict)
      setTownData(targetTown)

      if (
        response?.data?.data?.city_id === 0 &&
        response?.data?.data?.district_id === 0 &&
        response?.data?.data?.ward_id === 0 ||
        response?.data?.data?.length === 0
      ) {
        setErrorSeparate(true)
      } else {setErrorSeparate(false)}

    } else showAlert({content: 'Tách địa chỉ thất bại', type: 'danger'})
  }

  const handleReport = () => {
    if (edit?.id) {
      showAlert({
        content: 'Dữ liệu đang chỉnh sửa chưa được cập nhật',
        type: 'warning',
        duration: 2000,
      })
      pageDispatch({
        type: singleActions.ROW_EDIT_WARNING_EMPTY,
        payload: {warning: true},
      })
      return
    }

    pageDispatch({
      type: singleActions.MODAL_OPEN,
      payload: {
        id: 'report-modal',
        data: {address: tmpAddress, onSubmit: () => handleReportSubmit()},
      },
    })
  }

  const handleReportSubmit = async () => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/detect/report`,
      JSON.stringify({
        file_id: data?.file_id,
        detail_id: data?.id,
      }),
    )

    if (!!response?.data?.success) {
      if (tab?.active === 'success') {
        const failedList = [data, ...failedData]
        const successList = successData.map(item =>
          item?.id === data?.id ? {...item, is_reported: '1'} : item,
        )

        pageDispatch({
          type: singleActions.DATA_UPDATE,
          payload: {failedData: failedList, successData: successList},
        })
      }

      showAlert({content: 'Đã gửi báo lỗi thành công', type: 'success'})
    } else showAlert({content: 'Đã gửi báo lỗi thất bại', type: 'danger'})
  }

  const onAddressInputBlur = () =>
    setTimeout(() => setShouldFocusAddressInput(false), 150)

  const onAddressInputChange = val => {
    setErrorSeparate(false)
    setAddress(val)
  }

  let timeout = null
  const onAddressInputTyping = e => {
    if (e.keyCode === 13) {
      setErrorSeparate(false)
      handleSeparateAddress()
      e.target.blur()
      return
    }

    clearTimeout(timeout)

    timeout = setTimeout(function () {
      if (address) suggestAddress()
      else setSuggestData([])
    }, 200)
  }

  const suggestAddress = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/suggest-address?keyword=${address}`,
    )

    if (!!response?.data?.success) setSuggestData(response?.data?.data || [])
  }

  const onAddressInputFocus = () => setShouldFocusAddressInput(true)

  const handleProvinceChange = val => {
    const selectedProvince = locationJsonData.find(item => item?.name === val)

    const formatDistrictList = Array.isArray(selectedProvince?.list)
      ? selectedProvince.list.map(item => item?.name)
      : []

    setProvince(val)
    setDistrict('')
    setTown('')

    setDistrictData(formatDistrictList)
    setTownData([])
  }

  const handleDistrictChange = val => {
    const selectedProvince = locationJsonData.find(
      item => item?.name === province,
    )
    const selectedDistrict = selectedProvince?.list.find(
      item => item?.name === val,
    )

    const formatTownList = Array.isArray(selectedDistrict?.list)
      ? selectedDistrict.list.map(item => item?.name)
      : []

    setDistrict(val)
    setTown('')

    setTownData(formatTownList)
  }

  const handleTownChange = val => setTown(val)

  const handleOptionClick = val => {
    handleSeparateAddress(val)
    setAddress(val)
  }

  const handleEditSubmit = async () => {
    const findingProvince = locationJsonData.find(
      item => item?.name === province,
    )
    const findingDistrict = findingProvince?.list
      ? findingProvince.list.find(item => item?.name === district)
      : []
    const findingTown = findingDistrict?.list
      ? findingDistrict.list.find(item => item?.name === town)
      : []

    const addressArr = [
      findingProvince?.name,
      findingDistrict?.name,
      findingTown?.name,
    ].filter(item => !!item)
    console.log(addressArr)

    if (tab?.active === 'success') {
      if (addressArr.includes(false)) {
        showAlert({
          content: 'Tất cả các field địa chỉ không được rỗng',
          type: 'warning',
        })

        return
      }
    }

    const checkAddress = addressArr.join(', ')

    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/detect/save`,
      JSON.stringify({
        file_id: data?.file_id,
        detail_id: data?.id,
        address:
          tab?.active === 'success' ? address || checkAddress : tmpAddress,
        city_id: findingProvince?.id,
        city_name: findingProvince?.name,
        district_id: findingDistrict?.id,
        district_name: findingDistrict?.name,
        ward_id: findingTown?.id,
        ward_name: findingTown?.name,
      }),
    )

    if (!!response?.data?.success) {
      setTmpAddress(address)
      setTmpProvince(province)
      setTmpDistrict(district)
      setTmpTown(town)

      showAlert({content: 'Cập nhật địa chỉ thành công', type: 'success'})

      pageDispatch({type: singleActions.ROW_EDIT_RESET})

      const res = await sendRequestAuth(
        'get',
        `${config.API}/tool/detect/detail/${params.fileId}`,
      )

      if (!!res?.data?.success) {
        const failedList = Array.isArray(res?.data?.data?.failed)
          ? res.data.data.failed
          : []
        const successList = Array.isArray(res?.data?.data?.success)
          ? res.data.data.success
          : []

        pageDispatch({
          type: singleActions.FETCH_DATA,
          payload: {
            failedData: failedList,
            successData: successList,
          },
        })

        setTriggerUpdate(!triggerUpdate)
      }
    } else showAlert({content: 'Cập nhật địa chỉ thất bại', type: 'danger'})
  }

  useEffect(() => {
    if (edit?.id) handleEditReset(true)
  }, [edit?.id])

  return {
    tab,
    edit,
    address,
    province,
    district,
    districtData,
    town,
    townData,
    suggestData,
    triggerUpdate,
    canEdit,
    canSubmit,
    isReported,
    shouldFocusAddressInput,
    errorSeparate,
    handleEdit,
    handleEditReset,
    onAddressInputBlur,
    onAddressInputChange,
    onAddressInputFocus,
    onAddressInputTyping,
    handleEditSubmit,
    handleInputFocus,
    handleOptionClick,
    handleSeparateAddress,
    handleProvinceChange,
    handleDistrictChange,
    handleTownChange,
    handleReport,
  }
}

export default useRowFunction
