import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Text} from 'common/text'
import {StyledFacebookLivestreamScript_FanpageLogoModal} from './_styled'

export const FacebookLivestreamScript_FanpageLogoModal = ({
  list,
  name,
  onClose,
  ...props
}) => {
  return (
    <Modal
      title="Danh sách các trang áp dụng"
      actions={[
        <Button
          appearance="ghost"
          size="sm"
          style={{minWidth: 110}}
          onClick={onClose}
        >
          Đóng
        </Button>,
      ]}
      width={480}
      onClose={onClose}
    >
      <Text as="div" style={{marginTop: -16}}>{`Kịch bản: ${name}`}</Text>
      <StyledFacebookLivestreamScript_FanpageLogoModal
        className={`common-scrollbar ${props?.className}`}
      >
        {list.map(item => (
          <div
            key={item?.page_id}
            className="facebook-livestream-script-fanpage-logo-modal__item"
          >
            <img
              className="facebook-livestream-script-fanpage-logo-modal__image"
              src={item?.page_avatar}
              alt={item?.page_name}
            />
            <Text style={{flex: 1}}>{item?.page_name}</Text>
          </div>
        ))}
      </StyledFacebookLivestreamScript_FanpageLogoModal>
    </Modal>
  )
}
