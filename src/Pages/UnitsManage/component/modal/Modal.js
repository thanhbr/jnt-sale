import {Unit} from 'Pages/UnitsManage'
import './Modal.scss'
import {ActionType} from 'Pages/UnitsManage/store/action'
import React, {useContext, useEffect, useState} from 'react'
import {Modal, Box} from '@mui/material'
import {Button} from 'common/button'
import {useUnit} from 'Pages/UnitsManage/hooks/useUnit'
import CreateUnit from '../createNew/CreateUnit'
export default function ModalUnit() {
  const {state, dispatch} = useContext(Unit)
  const [aniModalClose, setAniModalClose] = useState(false)
  const {createUnitsManage, updateUnitsManage, errors} = useUnit()

  const unit = state.list?.find(x => x.id === state.edit_id) || {unit_name: '', unit_short_name: '', status: '1'}
  const [data, setData] = useState({
    unit_name: {value: unit.unit_name || '', isValid: true, errorMessage: ''},
    unit_short_name: {value: unit.unit_short_name || '', isValid: true, errorMessage: ''},
    status: {value: unit.status || '1', isValid: true, errorMessage: ''},
  })
  const [isTouch, setIsTouch] = useState(false)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (data.unit_name.value !== unit.unit_name || data.unit_short_name.value !== unit.unit_short_name || data.status.value !== unit.status) {
      setIsTouch(true)
    } else setIsTouch(false)

    setIsValid(checkDataValid(data))
  }, [data])

  useEffect(() => {
    if (errors.length <= 0) return

    errors.forEach(x => {
      data[x.field].errorMessage = x.message
      data[x.field].isValid = false
    })

    setData({...data})
  }, [errors])

  const checkDataValid = (data) => {
    let isValid = true
    Object.keys(data).forEach(key => {
      if (!data[key].isValid) {
      isValid = false
    }})
    return isValid
  }

  const handleCreate = () => {
    if (!isValid) return

    if (state.disable_save) updateUnitsManage(data)
    else createUnitsManage(data)
  }

  const closeModal = () => {
    setAniModalClose(true)
      setTimeout(() => {
        dispatch({type: ActionType.OPEN_MODAL, payload: !state.openModal})
        dispatch({type: ActionType.SET_EDIT_ID, payload: ''})
        setAniModalClose(false)
      }, 300)
  }

  const handleClose = () => {
    if (!isTouch) {
      closeModal()
    } else {
      dispatch({
        type: ActionType.SET_CONFIRM,
        payload: {
          ...state.confirm,
          open: true,
          title: 'Xác nhận rời khỏi trang',
          type: 'CONFIRM',
          message: 'Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?',
          action: closeModal,
        },
      })
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
          className={'dismiss_unit'}
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
              <CreateUnit data={data} setData={setData}/>
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
                  disabled={!isTouch || !isValid}
                  onClick={handleCreate}
                >
                  Lưu
                </Button>
              ) : (
                <Button
                  appearance="primary"
                  className="button_unit-save"
                  disabled={!isTouch || !isValid}
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
