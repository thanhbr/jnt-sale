import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import {useState} from 'react'
import {useEffect} from 'react'
import useFacebookFanpage from '../../hooks/useFacebookFanpage'
import {FacebookFanpageConnectModal} from '../connectModal'
import {FacebookFanpageDeleteLinkModal} from '../deleteLinkModal'
import {FacebookFanpageDisconnectModal} from '../disconnectModal'
import {FacebookFanpageHeader} from '../header'
import {FacebookFanpageLogoutModal} from '../logoutModal'
import {FacebookFanpagePermissionSelectModal} from '../permissionSelectModal'
import {StyledFacebookFanpageWrapper} from './_styled'

export const FacebookFanpageWrapper = ({containerProps, ...props}) => {
  const {facebookAuth, logout, getUser} = useFacebookAuth()
  const {auth} = facebookAuth

  const {data, properties, methods} = useFacebookFanpage()

  const [indexToggle, setIndexToggle] = useState(false)

  useEffect(() => {
    if (auth.userId) getUser()
  }, [auth.userId])

  return (
    <StyledFacebookFanpageWrapper {...props}>
      <img
        className="facebook-fanpage-wrapper__banner"
        src="/img/fb/backgrounds/banner.jpg"
        alt="Banner"
      />
      <div
        className="facebook-fanpage-wrapper__header"
        style={{zIndex: indexToggle ? 2 : 1}}
        onMouseEnter={() => setIndexToggle(true)}
      >
        <FacebookFanpageHeader onToggleModal={methods.setModal} />
      </div>
      <div
        {...containerProps}
        className={`facebook-fanpage-wrapper__container ${
          containerProps?.className || ''
        }`}
        style={{zIndex: indexToggle ? 1 : 2}}
        onMouseEnter={() => setIndexToggle(false)}
      >
        <div className="facebook-fanpage-wrapper__content">
          {props?.children}
        </div>
        <div className="facebook-fanpage-wrapper__footer">
          <Text>
            Bạn không tìm thấy trang cần quản lý?{' '}
            <Text as="a" href="#" color={THEME_SEMANTICS.delivering}>
              Tìm hiểu thêm.
            </Text>
          </Text>
        </div>
      </div>
      {data.modal.id === 'connect' && (
        <FacebookFanpageConnectModal
          list={properties.selectedDisconnectedList}
          warningList={properties.warningSelectedDisconnectedList}
          onClose={() => methods.setModal(null)}
          onSubmit={methods.connectFanpages}
        />
      )}
      {data.modal.id === 'disconnect' && (
        <FacebookFanpageDisconnectModal
          onClose={() => methods.setModal(null)}
          onSubmit={methods.disconnectFanpages}
        />
      )}
      {data.modal.id === 'deleteLink' && (
        <FacebookFanpageDeleteLinkModal
          onClose={() => methods.setModal(null)}
        />
      )}
      {data.modal.id === 'logout' && (
        <FacebookFanpageLogoutModal
          onClose={() => methods.setModal(null)}
          onSubmit={() => {
            logout()
            methods.setModal(null)
          }}
        />
      )}
      {data.modal.id === 'permissionSelect' && (
        <FacebookFanpagePermissionSelectModal
          onClose={() => methods.setModal(null)}
          onSubmit={() => {
            if (data.modal.opt?.onSubmit) data.modal.opt.onSubmit()
            methods.setModal(null)
          }}
        />
      )}
    </StyledFacebookFanpageWrapper>
  )
}
