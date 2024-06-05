import React, { useContext, useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material'
import { Button } from 'common/button'
import "./Modal.scss"
import { Text } from 'common/text'
import { WarehouseTransferContext } from 'Pages/CreateWarehouseTransfer/provider/_context'
import { actionTypes } from 'Pages/CreateWarehouseTransfer/provider/_actions'

export default function ModalInfo() {
  const { state, dispatch } = useContext(WarehouseTransferContext)
  
  const handleClose = () => {
    dispatch({
      type: actionTypes.SET_MODAL_INFO,
      payload: {...state.modalInfo, open: false},
    })
  }

  return (
    <Modal
      open={state.modalInfo.open}
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
          className='warehouse-manager_note-confirm_title'
        >{state.modalInfo.title}</Text>
        <Text
          as="p"
          lineHeight={19}
          className='warehouse-manager_note-confirm_text'
        >
          {state.modalInfo.message}
        </Text>

        <div className='warehouse-manager_note-confirm_button'>
          <Button className='warehouse-manager_note-confirm_close' onClick={handleClose}>Đóng</Button>
        </div>
      </Box>
    </Modal >
  )
}
