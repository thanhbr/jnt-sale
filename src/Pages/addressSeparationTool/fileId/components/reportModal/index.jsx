import {Modal} from '@mui/material'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {useContext} from 'react'
import {AddressSeparationSingleFileContext} from '../..'
import {StyledReportModal} from './_styled'

export const ReportModal = ({open, onClose, ...props}) => {
  const {pageState} = useContext(AddressSeparationSingleFileContext)
  const {modal} = pageState
  const data = modal?.data

  const handleSubmit = () => {
    if (data?.onSubmit) data.onSubmit()

    onClose()
  }

  return (
    <Modal {...props} open={open} onClose={onClose}>
      <StyledReportModal>
        <div className="report-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            Báo lỗi
          </Text>
        </div>
        <div className="report-modal__body">
          <Text as="p" style={{marginBottom: 24}}>
            Giúp đội ngũ EVO hoàn thiện tool tách địa chỉ ngày một tốt hơn bằng
            cách gửi báo lỗi những địa chỉ mà bạn cho rằng hệ thống xử lý chưa
            chính xác.
          </Text>
          <Text as="p">
            Bạn có chắc chắn kết quả tách địa chỉ <b>{data?.address}</b> dưới
            đây là{' '}
            <span style={{color: THEME_SEMANTICS.failed}}>chưa chính xác?</span>
          </Text>
        </div>
        <div className="report-modal__footer">
          <Button
            className="report-modal__btn"
            size="sm"
            appearance="ghost"
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            className="report-modal__btn"
            size="sm"
            data-submit="true"
            onClick={handleSubmit}
          >
            Báo lỗi
          </Button>
        </div>
      </StyledReportModal>
    </Modal>
  )
}
