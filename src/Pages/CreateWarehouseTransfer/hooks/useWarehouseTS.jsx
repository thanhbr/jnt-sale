import {sendRequestAuth} from 'api/api'
import { Text } from 'common/text'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {actionTypes} from '../provider/_actions'
import {WarehouseTransferContext} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformSelectedProductData,
  transformWarehouseData,
} from '../utils/transform'

const useWarehouseTS = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {generalInfo, productInfo, extraInfo, validate} = state.form
  const {showAlert} = useAlert()

  const submitQueries = {
    warehouse_export: generalInfo.warehouseExport?.value || '',
    warehouse_import: generalInfo.warehouseImport?.value || '',
    arr_product: productInfo.selected || [],
    date_time: extraInfo.transferDate || '',
    note: extraInfo.note || '',
  }

  const handleFetchOrigin = async () => {
    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/warehouse/warehouses?status=1&keyword=&per_page=10&start=0`,
      ),
    ])

    if (!!response[0]?.data?.success) {
      let warehouseValueData = null
      const formatWarehouseList = ArrayUtils.getQualifiedArray(
        response[0]?.data?.data,
      ).map(item => {
        if (item?.is_main === '1' && !warehouseValueData)
          warehouseValueData = transformWarehouseData(item)
        return transformWarehouseData(item)
      })

      dispatch({
        type: actionTypes.ORIGIN,
        payload: {
          generalInfo: {
            warehouseList: {
              list: formatWarehouseList,
              page: 0,
              total: response[0]?.data?.meta?.total || 0,
              store_limit: response[0]?.data?.meta?.store_limit || 0,
            },
          },
        },
      })
    }
  }

  const resetFormData = () => {
    dispatch({type: 'RESET_FORM_DEFAULT'})
    dispatch({type: 'RESET_VALIDATE_FORM'})
    dispatch({type: 'UPDATE_COLLECT_TRIGGER', payload: true})

    // UV-1587
    dispatch({
      type: actionTypes.UPDATE_SHIPPING_INFO,
      payload: {
        deliveryNote: {
          selected: 0,
          content:
            state?.deliveryNote?.find(item => +item.is_default === 1)
              ?.content || '',
        },
      },
    })
  }

  const validateForm = () => {
    const validateForm = {
      ...validate,
    }

    if (!generalInfo.warehouseExport?.value)
      validateForm.warehouseExport = 'Kho xuất hàng không được để trống'
    if (!generalInfo.warehouseImport?.value)
      validateForm.warehouseImport = 'Kho nhập hàng không được để trống'
    if (productInfo.selected?.length <= 0) validateForm.productList = true
    else if (
      productInfo.selected.find(
        x =>
          Number(x.transferQuantity) <= 0 ||
          Number(x.transferQuantity) > Number(x.info.warehouse_quantity),
      )
    )
      validateForm.productList = true
    else validateForm.productList = false

    let validateStatus = 0
    if (
      [
        generalInfo.warehouseExport?.value ===
          generalInfo.warehouseImport?.value,
        !!validateForm.warehouseExport,
        !!validateForm.warehouseImport,
        !!validateForm.productList,
      ].includes(true)
    ) {
      validateStatus = 1
      dispatch({
        type: actionTypes.SET_VALIDATE_FORM,
        payload: {...validate, ...validateForm},
      })
    }
    return validateStatus
  }

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(null)
  const handleSubmit = async () => {
    if (debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 2000)

      const formatProductList = ArrayUtils.getQualifiedArray(
        productInfo.selected,
      ).map(transformSelectedProductData)

      const validateStatus = validateForm()
      if (+validateStatus === 0) {
        setConfirmDeleteModalData({
          content: <>
            <Text>Thao tác này sẽ thực hiện điều chuyển số lượng tồn kho các sản phẩm được khai báo trong phiếu từ Kho xuất hàng sang Kho nhập hàng.</Text>
              <br />
              <br />
              <Text>Bạn có chắc chắn muốn thực hiện?</Text>
            </>,
          title: 'Xác nhận chuyển kho',
          onClose: () => setConfirmDeleteModalData(null),
          onSubmit: async () => {
            setConfirmDeleteModalData(null)
            dispatch({type: 'UPDATE_LOADING', payload: true})
            const response = await sendRequestAuth(
              'post',
              `${config.API}/warehouse/transfer/create`,
              {...submitQueries, arr_product: formatProductList},
            )
            if (response?.data?.success) {
              dispatch({type: actionTypes.RESET_FORM_DEFAULT})
              showAlert({
                type: 'success',
                content: 'Thêm mới phiếu chuyển kho thành công',
              })
              navigate('/warehouse/transfer')
            } else {
              const errorMessage = Array.isArray(response?.errors) ? response?.errors?.details[0]?.message : response?.errors?.details?.message
              showAlert({
                type: 'danger',
                content: 'Tồn kho sản phẩm muốn chuyển đã bị giảm vì sản phẩm vừa được sử dụng nghiệp vụ khác, vui lòng kiểm tra lại',
              })
            }
            dispatch({type: 'UPDATE_LOADING', payload: false})
            dispatch({type: actionTypes.SET_FORM_VALID, payload: true})
          },
        })
        
      }
      else dispatch({type: actionTypes.SET_FORM_VALID, payload: false})
    }
  }

  return {
    form: state.form,
    properties: {
      isValid: state.form.isValid,
      confirmDeleteModalData,
    },
    methods: {
      onFetchOrigin: handleFetchOrigin,
      onSubmit: handleSubmit,
      onResetFormData: resetFormData,
    },
    loading: state.loading,
    productInfo,
  }
}

export default useWarehouseTS
