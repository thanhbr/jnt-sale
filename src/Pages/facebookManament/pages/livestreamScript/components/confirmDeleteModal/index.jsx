import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'

export const FacebookLivestreamScriptConfirmDeleteModal = ({
  loading,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      title="Xóa kịch bản lên đơn tự động"
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
                style={{
                  minWidth: 110,
                  marginLeft: 8,
                  background: THEME_SEMANTICS.failed,
                  borderColor: THEME_SEMANTICS.failed,
                }}
                onClick={onSubmit}
              >
                Xóa
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
        <Text>
          Hệ thống sẽ ngừng cơ chế lên đơn hàng tự động tại các trang đã cấu
          hình trong kịch bản này. Bạn có chắc chắn muốn xóa kịch bản lên đơn tự
          động đã chọn ?
        </Text>
      )}
    </Modal>
  )
}
