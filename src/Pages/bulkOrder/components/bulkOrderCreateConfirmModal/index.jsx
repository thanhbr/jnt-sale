import {Button} from 'common/button'
import {Text} from 'common/text'
import {useState} from 'react'
import {StyledBulkOrderCreateConfirmModal} from './_styled'

export const BulkOrderCreateConfirmModal = ({data, ...props}) => {
  const [canSubmit, setCanSubmit] = useState(true)

  const handleSubmit = () => {
    if (!canSubmit) return
    setCanSubmit(false)

    if (data?.onSubmit) {
      const response = data.onSubmit()

      response.then(res => {
        if (!!res?.data?.success) {
          if (data?.onClose) data.onClose()
        }
        setCanSubmit(true)
      })
    }
  }

  return (
    <StyledBulkOrderCreateConfirmModal {...props} onClick={data?.onClose}>
      <div
        className="bulk-order-create-confirm-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="bulk-order-create-confirm-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            Xoá đơn hàng
          </Text>
        </div>
        <div className="bulk-order-create-confirm-modal__body">
          <Text as="p">Bạn có chắc chắn muốn xoá dòng đơn hàng đã chọn?</Text>
        </div>
        <div className="bulk-order-create-confirm-modal__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110, marginLeft: 8}}
            onClick={data?.onClose}
          >
            Hủy
          </Button>
          <Button
            appearance="danger"
            disabled={!canSubmit}
            size="sm"
            style={{minWidth: 110, marginLeft: 8}}
            onClick={handleSubmit}
          >
            Xóa
          </Button>
        </div>
      </div>
    </StyledBulkOrderCreateConfirmModal>
  )
}
