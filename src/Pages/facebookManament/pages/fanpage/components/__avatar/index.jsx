import {Button} from 'common/button'
import {Text} from 'common/text'
import {StyledFacebookFanpage__Avatar} from './_styled'

export const FacebookFanpage__Avatar = ({
  avatar,
  name,
  onToggleLogoutModal,
  ...props
}) => {
  return (
    <StyledFacebookFanpage__Avatar
      {...props}
      placement="bottom-end"
      renderPopper={
        props?.renderPopper
          ? props.renderPopper
          : ({onClose}) => (
              <div className="facebook-fanpage-avatar__popper">
                <img
                  className="facebook-fanpage-avatar__popper-image"
                  src={avatar}
                  alt={name}
                />
                <div className="facebook-fanpage-avatar__popper-content">
                  <Text
                    as="div"
                    fontSize={15}
                    fontWeight={600}
                    lineHeight={21}
                    style={{marginBottom: 8}}
                  >
                    {name}
                  </Text>
                  <Button
                    className="facebook-fanpage-avatar__popper-logout"
                    size="sm"
                    onClick={() => {
                      if (onClose) onClose()
                      if (onToggleLogoutModal) onToggleLogoutModal('logout')
                    }}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </div>
            )
      }
    >
      <img className="facebook-fanpage-avatar__image" src={avatar} alt={name} />
    </StyledFacebookFanpage__Avatar>
  )
}
