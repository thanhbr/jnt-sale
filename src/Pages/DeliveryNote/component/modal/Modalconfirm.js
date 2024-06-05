import React, { useContext, useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material'
import { Button } from 'common/button'
import "./Modal.scss"
import { useConfirm } from 'Pages/DeliveryNote/useDelivery/useConfirm'
import { Delivery } from 'Pages/DeliveryNote'
import { Text } from 'common/text'
export default function Modalconfirm() {
  const { state, dispatch } = useContext(Delivery)
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
      <Box className="delivery_note-confirm">
        <Text
          as="p"
          fontSize={20}
          fontWeight={600}
          lineHeight={28}
          className='delivery_note-confirm_title'
        >Xác nhận rời khỏi trang</Text>
        <Text
          as="p"
          lineHeight={19}
          className='delivery_note-confirm_text'
        >
          Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?
        </Text>

        <div className='delivery_note-confirm_button'>
          <Button className='delivery_note-confirm_cancel'  appearance='ghost' onClick={handleCloseConfirm}>Hủy</Button>
          <Button className='delivery_note-confirm_acept' onClick={handleClosePopup}>Xác nhận</Button>
        </div>
      </Box>
    </Modal >
  )
}
