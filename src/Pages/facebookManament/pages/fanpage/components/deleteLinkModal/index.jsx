import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'

export const FacebookFanpageDeleteLinkModal = ({onClose, ...props}) => {
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
                Đóng
              </Button>,
            ]
      }
      title={props?.title || 'Hủy liên kết trang'}
      width={props?.width || 640}
      onClose={onClose}
    >
      <Text as="p" style={{padding: '8px 0 16px 0'}}>
        Bạn thực sự muốn hủy liên kết trang này với evoshop? Hãy thực hiện theo
        hướng dẫn{' '}
        <Text as="a" href="#" color={THEME_SEMANTICS.delivering}>
          tại đây
        </Text>{' '}
        nhé.
      </Text>
    </Modal>
  )
}
