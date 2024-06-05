import React, { useState } from 'react'
import './index.scss'
import { Box, Modal } from '@mui/material'
import {Button} from '../../common/button/index'
import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";
import {useTranslation} from "react-i18next";

const Index = props => {
  const {t} = useTranslation()
  const { txtConfirm } = props
  const [confirm, setConfirm] = useState(true)
  return (
    <>
      <Modal
        open={confirm}
        onClose={() => {
          props.handleConfirm(false)
          setConfirm(false)
        }}
        className={'modal-confirm'}
      >
        <Box className={'modal-confirm__box'}>
          <div>
            <p>{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM_LEAVING_CONTENT)}</p>
            <div className={'modal-confirm__group-btn'}>

              <Button size='sm' className={'modal-confirm__dismiss'} appearance={'ghost'}
                onClick={() => {
                  props.handleConfirm(false)
                  setConfirm(false)
                }}
              >{t(DISPLAY_NAME_MENU.GENERAL.CANCEL)}</Button>
              {/* <button className={'modal-confirm__dismiss'}
                      onClick={() => {
                        props.handleConfirm(false)
                        setConfirm(false)
                      }}
              >Hủy</button> */}
              <Button size='sm' className={'modal-confirm__save'}
                      onClick={() => {
                        props.handleConfirm(true)
                        setConfirm(false)
                      }}
              >{t(DISPLAY_NAME_MENU.GENERAL.UPDATE)}</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default Index