import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'

export const FacebookFanpageDisconnectModal = ({
  onClose,
  onSubmit,
  ...props
}) => {
  return (
    <Modal
      {...props}
      actions={
        props?.actions
          ? props.actions
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
                onClick={() => onSubmit && onSubmit({callback: onClose})}
              >
                Ngắt kết nối
              </Button>,
            ]
      }
      title={props?.title || 'Ngắt kết nối trang'}
      width={props?.width || 495}
      onClose={onClose}
    >
      <Text as="p" style={{padding: '8px 0 16px 0'}}>
        Sau khi ngắt kết nối, bạn sẽ không thể quản lý hội thoại, đơn hàng,
        livestream với trang bị ngắt. Bạn có chắc chắn muốn gỡ kết nối trang đã
        chọn?
      </Text>
    </Modal>
  )
}
