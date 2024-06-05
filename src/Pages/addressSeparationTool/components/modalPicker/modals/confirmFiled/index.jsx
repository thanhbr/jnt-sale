import {Modal} from '@mui/material'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {AddressSeparationToolContext} from 'Pages/addressSeparationTool'
import {useContext} from 'react'
import {StyledConfirmTheFileHasBeenFiledModal} from './_styled'

export const ConfirmTheFileHasBeenFiledModal = ({open, onClose, ...props}) => {
  const {pageState} = useContext(AddressSeparationToolContext)
  const {modal} = pageState
  const data = modal?.data

  const handleClose = () => {
    if (data?.onReverse) data.onReverse()
    onClose()
  }

  const handleSubmit = async () => {
    if (data?.onSubmit) data.onSubmit()
    onClose()
  }

  return (
    <Modal {...props} open={open} onClose={handleClose}>
      <StyledConfirmTheFileHasBeenFiledModal>
        <div className="confirm-the-file-has-been-filed__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            Xác nhận file đã lên đơn
          </Text>
        </div>
        <div className="confirm-the-file-has-been-filed__body">
          <Text as="p" style={{marginBottom: 20}}>
            Bạn có muốn xác nhận đã xử lý địa chỉ và lên đơn cho file này?
          </Text>
          <ul style={{paddingLeft: 24}}>
            <Text as="li" style={{listStyle: 'disc'}}>
              File name: {data?.data?.file_name}
            </Text>
            <Text as="li" style={{listStyle: 'disc'}}>
              Thời gian tải lên: {data?.data?.dt_created}
            </Text>
          </ul>
        </div>
        <div className="confirm-the-file-has-been-filed__footer">
          <Button
            className="confirm-the-file-has-been-filed__btn"
            appearance="ghost"
            onClick={handleClose}
          >
            Đóng
          </Button>
          <Button
            className="confirm-the-file-has-been-filed__btn"
            onClick={handleSubmit}
          >
            Xác nhận
          </Button>
        </div>
      </StyledConfirmTheFileHasBeenFiledModal>
    </Modal>
  )
}
