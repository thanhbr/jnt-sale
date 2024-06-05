import React, { useContext } from 'react'
import { Text } from 'common/text'
import './index.scss'
import { Box, Modal } from '@mui/material'
import { Button } from '../../../../../common/button'
import useGlobalContext from '../../../../../containerContext/storeContext'
import { useNavigate } from 'react-router-dom'

const ConfirmChanged = ({ ...props }) => {

  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const { changed } = GlobalState.facebookAuth
  const nav = useNavigate()
  const closeConfirm = () => {
    GlobalDispatch({
      type: 'UPDATE_CHANGE_STATUS',
      payload: {
        showPopup: false,
        link: '/facebook'
      }
    })
  }
  const leavePage = () => {
    GlobalDispatch({
      type: 'UPDATE_CHANGE_STATUS',
      payload: {
        status: false,
        showPopup: false,
        link: '/facebook'
      }
    })
    return nav(changed?.link)
  }
  return (
    <>
      <Modal
        open={!!changed.status && !!changed.showPopup}
        onClose={closeConfirm}
      >
        <Box className={`confirm-popup product-group-modal_confirm`}>
          <div>
            <div
              className={`confirm-popup__body`}
            >
              <div>
                <Text
                  fontSize={19}
                  fontWeight={600}
                >Xác nhận rời khỏi trang</Text>
                <Text as='p' className='product-group-modal_txt'>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời
                  khỏi trang khi thay đổi chưa được lưu?</Text>
              </div>
            </div>
            <div
              className={`confirm-popup__group-btn product-group-modal_dismiss`}
            >
              <Button onClick={closeConfirm}
                      appearance={'ghost'}
                      className={'confirm-popup__dismiss'}
              >Hủy</Button>
              <Button onClick={leavePage}
                      className={'confirm-popup__save'}
              >Xác nhận</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>

  )
}
export default ConfirmChanged