import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {bulkOrderActions, bulkOrderCreateActions} from '../provider/_actions'
import {BulkOrderCreateContext} from '../provider/_context'
import {getArrayFromValue} from '../utils/array'

const useBulkOrderCreate = () => {
  const params = useParams()
  const isCreatePage = params?.fileId === 'create'

  const {showAlert} = useAlert()

  const {state, dispatch} = useContext(BulkOrderCreateContext)

  const canShowTable = isCreatePage ? false : true

  const handleAllSelectedChange = () => {
    const checkedStatus = handleCheckAllSelected()
    // const readyList = state.table.display.list.filter(
    //   item =>
    //     ![
    //       !!item?.name,
    //       !!item?.phone,
    //       item?.address,
    //       !!item?.city_id && item.city_id !== '0',
    //       !!item?.district_id && item.district_id !== '0',
    //       !!item?.ward_id && item.ward_id !== '0',
    //       !!item?.number_pack,
    //       !!item?.weight,
    //       !!item?.item_name,
    //     ].includes(false),
    // )
    const readyList = state.table.display.list

    dispatch({
      type: bulkOrderCreateActions.TABLE_SELECTED_UPDATE,
      payload: {
        selected: {
          list:
            checkedStatus === 1 ||
            state.table.selected.list.length === readyList.length
              ? []
              : readyList,
        },
      },
    })
  }

  const handleAllFailSelected = boo => {

    const readyList = boo ? state.table.display.list.filter(
      item =>
        [
          !!item?.name,
          !!item?.phone,
          item?.address,
          !!item?.city_id && item.city_id !== '0',
          !!item?.district_id && item.district_id !== '0',
          !!item?.ward_id && item.ward_id !== '0',
          !!item?.number_pack,
          !!item?.weight,
          !!item?.item_name,
          item.status != 3,
        ].includes(false),
    ) : state.table.display.listOrigin

    dispatch({
      type: bulkOrderActions.TABLE_UPDATE_ONLY_ERROR,
      payload: {
        list: readyList,
        onlyError: boo
      },
    })

    dispatch({
      type: bulkOrderCreateActions.TABLE_SELECTED_UPDATE,
      payload: {
        selected: {
          list: []
        },
      },
    })

  }

  const handleCheckAllSelected = () => {
    const displayList = state.table.display.list
    const selectedList = state.table.selected.list

    if (selectedList.length <= 0) return 0
    else return selectedList >= displayList ? 1 : 2
  }

  const handleDeleteOrder = async id => {
    const selectedList = state.table.selected.list

    const response = await sendRequestAuth(
      'delete',
      `${config.API}/tool/bulks/delete-multiple`,
      JSON.stringify({
        file_id: state.table.file.id,
        detail_ids: id ? [id] : selectedList.map(item => Number(item.id)),
      }),
    )

    if (!!response?.data?.success) {
      showAlert({type: 'success', content: 'Xóa đơn hàng thành công'})
      handleFetchFile(state.table.file.id, {notLoading: true})
      dispatch({
        type: bulkOrderCreateActions.TABLE_SELECTED_UPDATE,
        payload: {
          selected: {
            list: !!id ? selectedList.filter(item => item?.id !== id) : [],
          },
        },
      })
    } else showAlert({type: 'danger', content: 'Xóa thất bại'})

    return response
  }

  const fetchReport = async (submitData, payload) => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/customer/report`,
      JSON.stringify({phone: submitData.map(item => item?.phone)}),
    )

    if (!!response?.data?.success)
      dispatch({
        type: bulkOrderCreateActions.TABLE_DISPLAY_UPDATE,
        payload: {
          ...payload,
          report: {list: getArrayFromValue(response?.data?.data)},
        },
      })
    else return false
    return true
  }

  const handleFetchFile = async (fileId, opt) => {
    if (!!!opt?.notLoading)
      dispatch({type: bulkOrderCreateActions.TABLE_DISPLAY_LOADING_UPDATE})

    const response = await sendRequestAuth(
      'get',
      `${config.API}/tool/bulks/detail/${fileId}`,
    )

    if (!!response?.data?.success) {
      let submitData = getArrayFromValue(response?.data?.data?.details)
      let failData = []
      if(!!state.table.display.onlyError){
        failData = submitData.filter(
          item =>
            [
              !!item?.name,
              !!item?.phone,
              item?.address,
              !!item?.city_id && item.city_id !== '0',
              !!item?.district_id && item.district_id !== '0',
              !!item?.ward_id && item.ward_id !== '0',
              !!item?.number_pack,
              !!item?.weight,
              !!item?.item_name,
              item.status != 3,
            ].includes(false))
      }
      const payload = {
        display: {
          list: failData.length > 0 ? failData : submitData,
          listOrigin: submitData,
        },
        file: {id: fileId},
        report: {list: state.table.report.list},
        total: {
          rows: Number(response?.data?.data?.total_rows || 0),
          sent: Number(response?.data?.data?.total_sent || 0),
        },
      }

      if (opt?.type === 'origin' && submitData.length > 0) {
        const check = fetchReport(
          getArrayFromValue(response?.data?.data?.details),
          payload,
        )
        if (check) return
      }
      dispatch({
        type: bulkOrderCreateActions.TABLE_DISPLAY_UPDATE,
        payload,
      })
      dispatch({
        type: bulkOrderActions.TABLE_UPDATE_ONLY_ERROR,
        payload: {
          onlyError: failData.length > 0 ? true :false
        },
      })
    }
  }

  const handleRowSelected = data => {
    const isSelected = handleRowCheckSelected(data?.id)

    dispatch({
      type: bulkOrderCreateActions.TABLE_SELECTED_UPDATE,
      payload: {
        selected: {
          list: isSelected
            ? state.table.selected.list.filter(item => item?.id !== data?.id)
            : [...state.table.selected.list, data],
        },
      },
    })
  }

  const handleRowCheckSelected = id =>
    !!state.table.selected.list.find(item => item?.id === id)

  const handleSendOrder = async (selectedList) => {

    const shippingPartner = state.form.shippingPartner
    const source = state.form.source
    const shippingPoint = state.form.shippingPoint

    const configOption = shippingPartner.options


    const opt = {
      detail_ids: selectedList,
      file_id: Number(state.table.file.id),
      setting: {
        partner: shippingPartner.value?.value
          ? Number(shippingPartner.value.value || 0) ||
          shippingPartner.value.value
          : '',
        partsign: getArrayFromValue(configOption?.partsign)[0] || '',
        origin_id:  source?.value?.value || 0,
        payer: configOption?.payer
          ? Number(configOption.payer || 0) || configOption.payer
          : '',
        pickup_id: shippingPoint.value?.value
          ? Number(shippingPoint.value.value || 0) || shippingPoint.value.value
          : '',
        request: configOption?.request
          ? Number(configOption.request || 0) || configOption.request
          : '',
        request_goods: configOption?.request_goods
          ? Number(configOption.request_goods || 0) ||
          configOption.request_goods
          : '',
        service: configOption?.service
          ? Number(configOption.service || 0) || configOption.service
          : '',
        transport: configOption?.transport || '',
      },
    }

    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/bulks/send`,
      JSON.stringify(opt),
    )

    if (!!response?.data?.success) {
      handleFetchFile(state.table.file.id, {notLoading: true})
      dispatch({
        type: bulkOrderCreateActions.TABLE_SELECTED_UPDATE,
        payload: {
          selected: {
            list: [],
          },
        },
      })
    }

    return response
  }

  return {
    table: {
      data: state.table,
      properties: {
        canShowTable,
        isCreatePage,
      },
      methods: {
        onAllSelectedToggle: handleAllSelectedChange,
        onAllFailSelected: handleAllFailSelected,
        onCheckAllSelected: handleCheckAllSelected,
        onCheckSelected: handleRowCheckSelected,
        onDeleteOrder: handleDeleteOrder,
        onFecthFile: handleFetchFile,
        onSelected: handleRowSelected,
        onSendOrder: handleSendOrder,
      },
    },
  }
}

export default useBulkOrderCreate
