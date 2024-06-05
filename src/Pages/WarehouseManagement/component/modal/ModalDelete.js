import React, {useContext, useEffect, useState} from 'react'
import {Modal, Box} from '@mui/material'
import {Button} from 'common/button'
import './Modal.scss'
import {useConfirm} from '../../hooks/useConfirm'
import { WarehouseManager } from 'Pages/WarehouseManagement'
import {Text} from 'common/text'
import {ActionType} from '../../store/action'

export default function ModalConfirm() {
  const {state, dispatch} = useContext(WarehouseManager)
  const {open, title, message, type, confirmButtonName} = state.confirm

  const handleClose = () => {
    dispatch({
      type: ActionType.SET_CONFIRM,
      payload: {...state.confirm, open: false},
    })
  }

  const handleAccept = () => {
    dispatch({
      type: ActionType.SET_CONFIRM,
      payload: {...state.confirm, accept: true, open: false},
    })
    state.confirm.action()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="warehouse-manager_note-confirm">
        <Text
          as="p"
          fontSize={20}
          fontWeight={600}
          lineHeight={28}
          className="warehouse-manager_note-confirm_title"
        >
          {title}
        </Text>
        <Text as="p" lineHeight={19} className="warehouse-manager_note-confirm_text">
          {message}
        </Text>

        <div className="warehouse-manager_note-confirm_button">
          <Button
            className="warehouse-manager_note-confirm_cancel"
            appearance="ghost"
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            className="warehouse-manager_note-confirm_acept"
            appearance={type}
            onClick={handleAccept}
          >
            {confirmButtonName}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
