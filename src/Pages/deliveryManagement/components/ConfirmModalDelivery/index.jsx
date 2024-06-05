import { Modal } from "@mui/material"
import './style.scss'
import { Button } from '../../../../common/button'

const ConfirmModalDelivery = ({ confirm, setConfirm }) => {
  const handleConfirm = () => {
    confirm.handleConfirm()
    setConfirm(prev => ({ ...prev, active: false }))
  }

  const handleCancel = () => {
    confirm?.handleCancel()
    setConfirm((prev) => ({ ...prev, active: false }))
  }

  return (
    <Modal
      open={confirm.active}
      onClose={() => setConfirm((prev) => ({ ...prev, active: false, isAccept: false }))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="custorm-confirm-message-delivery">
        <p>{confirm.title}</p>
        <span className="description">{confirm.content}</span>
        <div className="custorm-btn">
          <Button
            size="sm"
            appearance="ghost"
            onClick={handleCancel}
            style={{minWidth: 110}}
          >
            {confirm.btnCancel}
          </Button>
          <Button size="sm" style={{ minWidth: '110px', marginLeft: '8px' }}
                  onClick={handleConfirm}
          >
            {confirm.btnAccept}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModalDelivery
