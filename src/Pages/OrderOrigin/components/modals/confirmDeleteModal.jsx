import {Modal} from "@mui/material"
import {Button} from "../../../../common/button";
import './style.scss'
import {Text} from "../../../../common/text";

const ConfirmDeleteModal = ({confirm, setConfirm}) => {
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
            <div className="origin-confirm-message">
                <Text as={'p'}
                      fontWeight={600}
                      fontSize={20}
                      className={'origin-confirm-message_title'}
                >{confirm.title}</Text>
                <Text as={'p'}
                      className="description"
                >{confirm.content}</Text>
                <Text as={'p'}
                      className={'origin-confirm-message_content-2'}
                >{confirm.content_2}</Text>
                <div className="custorm-btn">
                    <Button
                        appearance="ghost"
                        className="custorm-btn-close btn_cancel"
                        onClick={() => setConfirm((prev) => ({...prev, active: false}))}
                    >
                        {confirm.btnCancel}
                    </Button>
                    <Button appearance="ghost" className={`custorm-btn-accept ${confirm.acceptStyle}`}
                            onClick={handleConfirm}>
                        {confirm.btnAccept}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmDeleteModal
