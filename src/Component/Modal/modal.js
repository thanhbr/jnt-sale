import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {OrderContext} from '../../LayoutWrapper'

export default function SimpleModal({...props}) {
  const {open = false, callback = () => {}, children, modalClassName=""} = props
  const handleClose = () => {
    callback()
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={`upos-modal-body ${modalClassName}`}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="upos-modal-content">
            {children || <div> No data</div>}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
