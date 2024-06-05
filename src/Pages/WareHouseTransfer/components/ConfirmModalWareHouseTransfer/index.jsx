import { Button, Modal } from "@mui/material"
import './style.scss'

const ConfirmModalDelivery = ({confirm, setConfirm}) => {
    const handleConfirm = () => {
        confirm.handleConfirm()
        setConfirm(prev => ({...prev, active: false}))
    }

    const handleCancel = () => {
      confirm?.handleCancel()
      setConfirm((prev) => ({...prev, active: false}))
    }

    return (
        <Modal
          open={confirm.active}
          onClose={() => setConfirm((prev) => ({...prev, active: false, isAccept: false}))}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="custorm-confirm-message-WareHouseTransfer">
            <p>{confirm.title}</p>
            <span className="description">{confirm.content}</span>
            <div className="custorm-btn">
              <Button
                className="custorm-btn-close"
                onClick={handleCancel}
              >
                {confirm.btnCancel}
              </Button>
              <Button className={`custorm-btn-accept ${confirm.acceptStyle}`} onClick={handleConfirm}>
               {confirm.btnAccept}
              </Button>
            </div>
          </div>
        </Modal>
    )
}

export default ConfirmModalDelivery
