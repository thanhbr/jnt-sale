import {Box, Modal} from '@mui/material'
import {Button} from 'common/button'
import {useCreateWarehouse} from 'Pages/CreateWarehouseTransfer/hooks/useCreateWarehouse'
import {actionTypes} from 'Pages/CreateWarehouseTransfer/provider/_actions'
import {WarehouseTransferContext} from 'Pages/CreateWarehouseTransfer/provider/_context'
import {useContext, useEffect, useState} from 'react'
import CreateWarehouse from '../createNew'
import './Modal.scss'
import {createWarehouseTransferInitialState} from '../../provider/_initialState'

export default function DrawerCreateWarehouse() {
  const {createUnitsManage} = useCreateWarehouse()
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {createModal, modalInfo} = state
  const {form, open, animationClose} = createModal
  const {name, address, isPurchase, status, isMain} = form

  const [onInit, setOnInit] = useState(true)

  const isDifference = [
    name.value === name.origin,
    address.value === address.origin,
    isPurchase.value === isPurchase.origin,
    status.value === status.origin,
    address.province.value
      ? address.province.value?.value === address.provinceOrigin
      : true,
    address.district.value
      ? address.district.value?.value === address.districtOrigin
      : true,
    address.ward.value
      ? address.ward.value?.value === address.wardOrigin
      : true,
  ].includes(false)

  const isValid = [
    !!name.value,
    name.value.length <= 30,
    !!address.value,
    !!address.province.value,
    !!address.district.value,
    !!address.ward.value,
  ].includes(false)

  useEffect(() => {
    setOnInit(false)
  }, [])

  const handleCreate = () => {
    const inputData = {
      warehouse_name: name.value,
      warehouse_address: address.value,
      city_id: address.province.value?.value,
      district_id: address.district.value?.value,
      ward_id: address.ward.value?.value,
      status: status.value ? 1 : -1,
      is_purchase: isPurchase.value ? 1 : -1,
      is_main: isMain.value ? 1 : 0,
    }

    if (state.form.generalInfo.warehouseList.total >= state.form.generalInfo.warehouseList.store_limit)
      dispatch({
        type: actionTypes.SET_MODAL_INFO,
        payload: {
          ...modalInfo,
          open: true,
          title: 'Cửa hàng đã đạt đến số lượng kho tối đa',
          type: 'info',
          message:
            'Số lượng kho hiện tại đã đạt giới hạn. Hãy liên hệ với UPOS hoặc tổng đài 1900 1511 để có thêm thông tin chi tiết!',
        },
      })
    else createUnitsManage(inputData)
  }

  const closeModal = () => {
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        animationClose: true,
      },
    })
    setTimeout(() => {
      dispatch({
        type: actionTypes.SET_CREATE_MODAL,
        payload: {
          ...createWarehouseTransferInitialState.createModal,
          animationClose: false,
        },
      })
    }, 300)
  }

  const handleClose = () => {
    if (isDifference) {
      // open confirm
      dispatch({
        type: actionTypes.SET_CREATE_MODAL,
        payload: {
          openConfirmClose: true,
        },
      })
    } else {
      closeModal()
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`unit_modal ${animationClose && 'modal_custom'}`}>
        <div className={'dismiss_unit'} onClick={handleClose}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1L1 13M1 1L13 13"
              stroke="#F4F7FC"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="general_unit">
          <div className="general_unit-group">
            <div className="general_unit-info">
              <CreateWarehouse />
            </div>
            <div className="button_unit">
              <Button
                appearance="ghost"
                className="button_unit-cancel"
                onClick={handleClose}
              >
                Hủy
              </Button>
              <Button
                appearance="primary"
                className="button_unit-save"
                disabled={!onInit && isValid}
                onClick={handleCreate}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
