import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'

export const FacebookLivestreamScriptConfirmDeactivateModal = ({
  loading,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      title="Ngưng sử dụng kịch bản"
      actions={
        loading
          ? []
          : [
              <Button
                appearance="ghost"
                size="sm"
                style={{minWidth: 110}}
                onClick={onClose}
              >
                Huỷ
              </Button>,
              <Button
                size="sm"
                style={{minWidth: 110, marginLeft: 8}}
                onClick={onSubmit}
              >
                Xác nhận
              </Button>,
            ]
      }
      width={480}
      onClose={onClose}
    >
      {loading ? (
        <div
          style={{
            minHeight: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner size={48} thickness={4} />
        </div>
      ) : (
        <Text as="p" style={{padding: '8px 0 16px 0'}}>
          Kịch bản bị ngưng sử dụng sẽ không thể tự động áp dụng ở các Fanpage
          mà bạn đã thiết lập. Bạn có chắc chắn muốn ngưng sử dụng kịch bản lên
          đơn tự động đã chọn?
        </Text>
      )}
    </Modal>
  )
}
