import { Delivery } from 'Pages/DeliveryNote'
import './Modal.scss'
import { ActionType } from 'Pages/DeliveryNote/store/action'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material'
import { Button } from 'common/button'
import Index from 'Component/ModalConfirm'
import { useDelivery } from 'Pages/DeliveryNote/useDelivery/useDelivery'
import CreateDelivery from '../createNew/CreateDelivery'
import { useConfirm } from 'Pages/DeliveryNote/useDelivery/useConfirm'
import {useCreateNote} from "../../useDelivery/useCreate";
export default function ModalDelivery() {
  const { state, dispatch } = useContext(Delivery)
  const [aniModalClose, setAniModalClose] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const { createDeliveryNote, handleCreate, handleUpdate } = useDelivery()
  const [disable, setDisable] = useState(false)
  const {changeSubmit} = useCreateNote()
  const { handleCloseConfirm, handleClosePopup } = useConfirm()
  useEffect(() => {
    if(state.checkEmpty || state.checkErrorPosition) setDisable(true)
    else setDisable(false)
  }, [state.checkErrorPosition,state.checkEmpty])

  const closeModal = () => {
    if (change_modal) {
      dispatch({ type: ActionType.OPEN_CONFIRM, payload: true })
      dispatch({ type: ActionType.CHECK_CONFIRM, payload: true })
      dispatch({ type: ActionType.CHECK_EMPTY, payload: false })
    }
    else {
      setAniModalClose(true)
      setTimeout(() => {
        dispatch({ type: ActionType.OPEN_MODAL, payload: !state.openModal })
        dispatch({ type: ActionType.INFO_NOTE, payload: '' })
        dispatch({ type: ActionType.DISABLE_SAVE, payload: false })
        dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
        dispatch({ type: ActionType.CHECK_EMPTY, payload: false })
        dispatch({ type: ActionType.CHECK_CONFIRM, payload: false })
        dispatch({ type: ActionType.ERROR_NOTE, payload: { valid: false, error: '' } })
        dispatch({ type: ActionType.ERROR_POSITION, payload: { valid: false, error: '' } })
        dispatch({ type: ActionType.CHECK_EMPTY_PROSITION, payload: false })
        dispatch({type:ActionType.CONTENT,payload:''})
        dispatch({type:ActionType.POSITION,payload:''})
      }, 300)
    }
  }
  let {change_modal}= state
  return (
    <Modal
      open={state.openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`delivery_modal ${aniModalClose && 'modal_custom'}`}>
        <div
          className={'dismiss_delivery'}
          onClick={() => {
            //  if(!bolUpdate) {
            if (change_modal) {
              dispatch({ type: ActionType.OPEN_CONFIRM, payload: true })
              dispatch({ type: ActionType.CHECK_CONFIRM, payload: false })
              dispatch({type:ActionType.CHANGE_MODAL,payload:false})
            } else {
              setAniModalClose(true)
              setTimeout(() => {
                dispatch({ type: ActionType.OPEN_MODAL, payload: !state.openModal })
                dispatch({ type: ActionType.INFO_NOTE, payload: '' })
                dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
                dispatch({ type: ActionType.CHECK_CONFIRM, payload: false })
                dispatch({ type: ActionType.ERROR_NOTE, payload: { valid: false, error: '' } })
                dispatch({ type: ActionType.ERROR_POSITION, payload: { valid: false, error: '' } })
                dispatch({type:ActionType.CONTENT,payload:''})
                dispatch({type:ActionType.POSITION,payload:''})
              }, 300)
            }

            //  } else {
            //    setConfirm(true)
            //  }
          }}
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

        <div className="general_delivery">
          <div className='general_delivery-group'>
            <div className="general_delivery-info">
              <CreateDelivery />
            </div>
            <div className="button_delivery">
              <Button
                appearance="ghost"
                className="button_delivery-cancel"
                onClick={closeModal}
              >
                Hủy
              </Button>
              {state.infoNote ? (
                <Button
                  appearance="primary"
                  className="button_delivery-save"
                  disabled={changeSubmit}
                  onClick={() => handleUpdate(state.infoNote.id)}
                >
                  Lưu
                </Button>
              ) : (
                <Button
                  appearance="primary"
                  className="button_delivery-save"
                  disabled={changeSubmit}
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
