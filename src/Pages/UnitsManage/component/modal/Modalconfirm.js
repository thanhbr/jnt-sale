import React, {useContext, useEffect, useState} from 'react'
import {Modal, Box} from '@mui/material'
import {Button} from 'common/button'
import './Modal.scss'
import {useConfirm} from 'Pages/UnitsManage/hooks/useConfirm'
import {Unit} from 'Pages/UnitsManage'
import {Text} from 'common/text'
import {ActionType} from 'Pages/UnitsManage/store/action'
export default function Modalconfirm() {
  const {state, dispatch} = useContext(Unit)
  const {open, title, message, type} = state.confirm

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
      <Box className="unit_note-confirm">
        <Text
          as="p"
          fontSize={20}
          fontWeight={600}
          lineHeight={28}
          className="unit_note-confirm_title"
        >
          {title}
        </Text>
        <Text as="p" lineHeight={19} className="unit_note-confirm_text">
          {message}
        </Text>

        <div className="unit_note-confirm_button">
          <Button
            className="unit_note-confirm_cancel"
            appearance="ghost"
            onClick={handleClose}
            size="sm"
            
          >
            Hủy
          </Button>
          <Button
            className="unit_note-confirm_acept"
            appearance={type === 'CONFIRM' ? 'info' : type === 'DELETE' ? 'danger' : '' }
            onClick={handleAccept}
            size="sm"
          >
            {type === 'CONFIRM' ? 'Xác nhận' : type === 'DELETE' ? 'Xóa' : ''}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
