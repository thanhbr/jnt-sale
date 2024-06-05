import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {NotificationBar} from 'common/notificationBar'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {useEffect, useState} from 'react'
import {StyledFacebookFanpageConnectModalListItem} from './_styled'

export const FacebookFanpageConnectModal = ({
  list,
  warningList = [],
  onClose,
  onSubmit,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(warningList.length <= 0)

  const generateFanpageNameListString = () => {
    let str = ''
    list.forEach(
      (item, i) => (str += `${i > 0 ? ', ' : ''}${item?.page_name || '---'}`),
    )
    return str
  }

  const handleSubmit = () => {
    setIsLoading(true)
    if (onSubmit) onSubmit({callback: onClose})
  }

  useEffect(() => {
    if (warningList.length <= 0 && onSubmit) onSubmit({callback: onClose})
  }, [warningList])

  return (
    <Modal
      {...props}
      actions={
        props?.actions
          ? props.actions
          : isLoading
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
                style={{minWidth: 110, marginLeft: 8}}
                onClick={handleSubmit}
              >
                Xác nhận
              </Button>,
            ]
      }
      description={
        props?.description
          ? props.description
          : isLoading
          ? 'Khi hoàn tất quá trình kết nối, dữ liệu tin nhắn/bình luận từ Facebook sẽ được đồng bộ về hệ thống.'
          : undefined
      }
      title={
        props?.title
          ? props.title
          : isLoading
          ? 'Thêm trang kết nối'
          : 'Thông báo'
      }
      width={props?.width || 640}
      onClose={!isLoading ? onClose : undefined}
    >
      {isLoading ? (
        <div
          style={{
            minHeight: 236,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner size={54} thickness={5} />
          <Text as="div" style={{marginTop: 24, textAlign: 'center'}}>
            Đang thực hiện quá trình kết nối và đồng bộ dữ liệu. Chờ chúng tôi
            một tí nhé!
          </Text>
        </div>
      ) : (
        <div style={{padding: '8px 0 16px 0'}}>
          <Text>
            Trang <Text as="b">{generateFanpageNameListString()}</Text> đang
            được kết nối với một tài khoản khác trên evoshop. Thao tác này sẽ:
          </Text>
          <ul style={{marginBottom: 20}}>
            <StyledFacebookFanpageConnectModalListItem>
              <Text>
                Ngắt kết nối trang{' '}
                <Text as="b">{generateFanpageNameListString()}</Text> với tài
                khoản hiện đang kết nối.
              </Text>
            </StyledFacebookFanpageConnectModalListItem>
            <StyledFacebookFanpageConnectModalListItem>
              <Text>
                Thực hiện kết nối các trang đã chọn với tài khoản đang đăng
                nhập.
              </Text>
            </StyledFacebookFanpageConnectModalListItem>
          </ul>
          <Text>Bạn có chắc chắn muốn thực hiện?</Text>
          <NotificationBar style={{marginTop: 32}}>
            <Text as="b">Lưu ý:</Text> Mỗi trang chỉ được phép kết nối duy nhất
            với một tài khoản cửa hàng.
          </NotificationBar>
        </div>
      )}
    </Modal>
  )
}
