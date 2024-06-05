import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'

export const FacebookLayoutGeneralLogoutModal = ({
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
                onClick={onSubmit}
              >
                Đăng xuất
              </Button>,
            ]
      }
      title={props?.title || 'Xác nhận đăng xuất'}
      width={props?.width || 480}
      onClose={onClose}
    >
      <Text as="p" style={{padding: '8px 0 16px 0'}}>
        Bạn có thực sự muốn đăng xuất tải khoản Facebook khỏi hệ thống evoshop?
      </Text>
    </Modal>
  )
}
