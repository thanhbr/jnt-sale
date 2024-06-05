import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'

export const FacebookResponsecontentScriptconfirmDeleteModal = ({
  loading,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
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
                Hủy
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
      title="Xóa mẫu nội dung phản hồi"
      width={480}
      onClose={loading ? undefined : onClose}
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
          <Spinner size={48} thicknes={4} />
        </div>
      ) : (
        <div style={{padding: '8px 0 16px 0'}}>
          <Text as="p">
            Bạn sẽ không thể chọn mẫu nội dung này để phản hồi nữa. Bạn có chắc
            chắn muốn xóa mẫu nội dung phản hồi đã chọn?
          </Text>
        </div>
      )}
    </Modal>
  )
}
