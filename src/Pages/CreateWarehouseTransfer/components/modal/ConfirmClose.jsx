import { Box, Modal } from '@mui/material'
import { Button } from 'common/button'
import { Text } from 'common/text'
import { actionTypes } from 'Pages/CreateWarehouseTransfer/provider/_actions'
import { WarehouseTransferContext } from 'Pages/CreateWarehouseTransfer/provider/_context'
import { createWarehouseTransferInitialState } from 'Pages/CreateWarehouseTransfer/provider/_initialState'
import { useContext } from 'react'
import "./Modal.scss"
export default function ModalClose() {
  const { state, dispatch } = useContext(WarehouseTransferContext)

  const handleCancel = () => {
    dispatch({ type: actionTypes.SET_CREATE_MODAL, payload: {openConfirmClose: false} })
  }

  const handleConfirm = () => {
    dispatch({ type: actionTypes.SET_CREATE_MODAL, payload: {
      animationClose: true
    }})
    setTimeout(() => {
      dispatch({ type: actionTypes.SET_CREATE_MODAL, payload: {
        ...createWarehouseTransferInitialState.createModal,
        animationClose: false
      }})
    }, 300)
  }

  return (
    <Modal
      open={state.createModal.openConfirmClose}
      onClose={handleCancel}
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
          <Button className='warehouse-manager_note-confirm_cancel' size={'sm'}  appearance='ghost' onClick={handleCancel}>Hủy</Button>
          <Button className='warehouse-manager_note-confirm_acept' size={'sm'} onClick={handleConfirm}>Xác nhận</Button>
        </div>
      </Box>
    </Modal >
  )
}
