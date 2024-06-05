import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Text} from 'common/text'

export const FacebookFanpagePermissionSelectModal = ({
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
                }}
                onClick={onSubmit}
              >
                Xác nhận
              </Button>,
            ]
      }
      title={
        props?.title || 'Xác nhận bỏ qua các trang không có quyền quản trị'
      }
      width={props?.width || 500}
      onClose={onClose}
    >
      <Text as="p" style={{padding: '8px 0 16px 0'}}>
        Bạn đang chọn truy cập một số trang không có quyền quản trị.
        <br />
        Nếu chọn
        <Text as="b"> Xác nhận</Text>: Hệ thống sẽ chỉ truy cập vào trang quản
        lý của các trang mà bạn có quyền quản trị.
      </Text>
    </Modal>
  )
}
