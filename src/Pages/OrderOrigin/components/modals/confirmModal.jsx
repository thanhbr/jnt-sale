import {Modal} from "@mui/material"
import {Button} from "../../../../common/button";
import './style.scss'

const ConfirmModal = ({confirm, setConfirm}) => {
    const handleConfirm = () => {
        confirm.handleConfirm()
        setConfirm(prev => ({...prev, active: false}))
    }

    return (
        <Modal
          open={confirm.active}
          onClose={() => setConfirm((prev) => ({...prev, active: false, isAccept: false}))}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="grcustorm-confirm-message">
            <p>{confirm.title}</p>
            <span className="description">{confirm.content}</span>
            <div className="custorm-btn">
              <Button
                className="custorm-btn-close btn_cancel"
                onClick={() => setConfirm((prev) => ({...prev, active: false}))}
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

export default ConfirmModal
