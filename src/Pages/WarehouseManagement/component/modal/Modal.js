import { WarehouseManager } from 'Pages/WarehouseManagement'
import './Modal.scss'
import { ActionType } from '../../store/action'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material'
import { Button } from 'common/button'
import Index from 'Component/ModalConfirm'
import { useWarehouse } from '../../hooks/useUnit'
import CreateWarehouseManager from '../createNew'
import { useConfirm } from '../../hooks/useConfirm'
import { initial } from 'Pages/WarehouseManagement/store/initial'

export default function ModalUnit() {
  const { createUnitsManage, updateUnitsManage } = useWarehouse()
  const { state, dispatch } = useContext(WarehouseManager)
  const { edit_item_id, meta } = state
  const { warehouseInfo } = state.form
  const { name, address, isPurchase, status, isMain } = warehouseInfo

  const [aniModalClose, setAniModalClose] = useState(false)
  const [onInit, setOnInit] = useState(true)

  const isDifference = [
    name.value === name.origin,
    address.value === address.origin,
    isPurchase.value === isPurchase.origin,
    status.value === status.origin,
    address.province.value ? address.province.value?.value === address.provinceOrigin : true,
    address.district.value ? address.district.value?.value === address.districtOrigin : true,
    address.ward.value ? address.ward.value?.value === address.wardOrigin : true,
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

    if (edit_item_id) updateUnitsManage(inputData)
    else {
      if (meta.total >= meta.store_limit) 
        dispatch({
          type: ActionType.SET_MODAL_INFO,
          payload: {
            ...state.modalInfo,
            open: true,
            title: 'Cửa hàng đã đạt đến số lượng kho tối đa',
            type: 'info',
            message: 'Số lượng kho hiện tại đã đạt giới hạn. Hãy liên hệ với Evo hoặc tổng đài 1900 1511 để có thêm thông tin chi tiết!',
          },
        })
      else createUnitsManage(inputData)
    }
  }

  const handleClose = () => {
    if (isDifference) {
      // open confirm
      dispatch({ type: ActionType.OPEN_CONFIRM, payload: true })
    } else {
      // close modal and reset form
      setAniModalClose(true)
      setTimeout(() => {
        dispatch({ type: ActionType.OPEN_MODAL, payload: false })
        dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
        dispatch({ type: ActionType.SET_ERROR, payload: [] })
        dispatch({ type: ActionType.RESET_FORM })
      }, 300)
    }
  }

  return (
    <Modal
      open={state.openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`unit_modal ${aniModalClose && 'modal_custom'}`}>
        <div
          className={'dismiss_warehouse_manager'}
          onClick={handleClose}
        >
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
              <CreateWarehouseManager />
            </div>
            <div className="button_unit">
              <Button
                appearance="ghost"
                className="button_unit-cancel"
                onClick={handleClose}
              >
                Hủy
              </Button>
              {state.disable_save ? (
                <Button
                  appearance="primary"
                  className="button_unit-save"
                  disabled={!onInit && isValid}
                  onClick={handleCreate}
                >
                  Lưu
                </Button>
              ) : (
                <Button
                  appearance="primary"
                  className="button_unit-save"
                  disabled={!onInit && isValid}
                  onClick={handleCreate}
                >
                  Lưu
                </Button>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
