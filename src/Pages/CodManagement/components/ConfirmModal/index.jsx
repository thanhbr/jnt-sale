import { Button, Modal } from "@mui/material"
import './style.scss'
import { COD_ICONS } from '../../interfaces/_icons'
import {useTranslation} from "react-i18next";

const ConfirmModal = ({confirm, setConfirm}) => {
    const handleConfirm = () => {
        confirm.handleConfirm()
        setConfirm(prev => ({...prev, active: false}))
    }
    const { t } = useTranslation()

    return (
        <Modal
          open={confirm.active}
          onClose={() => setConfirm((prev) => ({...prev, active: false, isAccept: false}))}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="cod-custorm-confirm-message">
            <p>{confirm.title}</p>
            <span className="description">{confirm.content}</span>
            <div className="note-confirm">
              <span style={{float:'left'}}>{COD_ICONS.qts}</span>
              <div className="note-confirm-text">
               <b>{t("note")}</b>: {t("condition_order_delivery_change_status_cod")}.
              </div>
            </div>
            <div className="custorm-btn">
              <Button
                className="custorm-btn-close"
                onClick={() => setConfirm((prev) => ({...prev, active: false,isAccept: false}))}
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
