import React, { useContext, useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material'
import { Button } from 'common/button'
import "./Modal.scss"
import { useConfirm } from '../../hooks/useConfirm'
import { WarehouseManager } from 'Pages/WarehouseManagement'
import { Text } from 'common/text'
export default function ModalClose() {
  const { state, dispatch } = useContext(WarehouseManager)
  const {
    handleCloseConfirm,
    handleClosePopup,
  } = useConfirm()
  return (
    <Modal
      open={state.openConfirm}
      onClose={handleCloseConfirm}
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
        >Xác nhận rời khỏi trang</Text>
        <Text
          as="p"
          lineHeight={19}
          className='warehouse-manager_note-confirm_text'
        >
          Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?
        </Text>

        <div className='warehouse-manager_note-confirm_button'>
          <Button className='warehouse-manager_note-confirm_cancel' size={'sm'}  appearance='ghost' onClick={handleCloseConfirm}>Hủy</Button>
          <Button className='warehouse-manager_note-confirm_acept' size={'sm'} onClick={handleClosePopup}>Xác nhận</Button>
        </div>
      </Box>
    </Modal >
  )
}
