import React, { useState } from 'react'
import './index.scss'
import { Box, Modal } from '@mui/material'
import {Button} from '../../../../common/button/index'
import { useTranslation } from "react-i18next";

const Index = props => {
  const { txtConfirm } = props
  const [confirm, setConfirm] = useState(true)
  const { t } = useTranslation()
  return (
    <>
      <Modal
          open={confirm}
          onClose={() => {
            props.handleConfirm(false)
            setConfirm(false)
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="grcustorm-confirm-message">
            <p>{t("general_confirm_leaving")}</p>
            <span className="description">{t("general_confirm_leaving_content")}</span>
            <div className="custorm-btn">
              <Button
                className="custorm-btn-close btn_cancel"
                appearance={'ghost'}
                onClick={() => {
                  props.handleConfirm(false)
                  setConfirm(false)
                }}
              >
                  {t("general_cancel")}
              </Button>
              <Button className={`custorm-btn-accept`}  onClick={() => {
                        props.handleConfirm(true)
                        setConfirm(false)
                      }}
              >
               {txtConfirm}
              </Button>
            </div>
          </div>
        </Modal>
    </>
  )
}

export default Index