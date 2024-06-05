import React, { useState } from 'react'
import './index.scss'
import {Box, Modal} from '@mui/material'
import {MODAL_CUSTOM} from '../Icons'

const ModalCustom = props => {
  const [open, setOpen] = useState(true)
  const [animation, setAnimation] = useState(false)
  const handleClose = () => {
    setAnimation(true)
    setTimeout(() => {
      setOpen(false)
    }, 300)
  }
  const handleDismiss = () => {
    setAnimation(true)
    setTimeout(() => {
      setOpen(false)
    }, 300)
  }
  return (
    <Modal open={open} onClose={handleClose} className={'modal-upos-custom'} >
      <Box className={`modal-upos-custom__box ${animation && 'modal-upos-custom__close'}`}>
        <div className={'modal-upos-custom__dismiss'} onClick={handleDismiss}>
            {MODAL_CUSTOM.dismiss}
        </div>
        {props.children}
      </Box>
    </Modal>
  )
}

export default ModalCustom