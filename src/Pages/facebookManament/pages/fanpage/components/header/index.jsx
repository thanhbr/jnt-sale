import {Text} from 'common/text'
import {Tooltip} from 'common/tooltip'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import useFacebookFanpage from '../../hooks/useFacebookFanpage'
import {FacebookFanpage__AccessBtn} from '../__accessBtn'
import {FacebookFanpage__Avatar} from '../__avatar'
import {FacebookFanpage__ConnectBtn} from '../__connectBtn'
import {FacebookFanpage__DisconnectBtn} from '../__disconnectBtn'
import {FacebookFanpage__SettingBtn} from '../__settingBtn'
import {StyledFacebookFanpageHeader} from './_styled'
import { useTranslation } from 'react-i18next'

export const FacebookFanpageHeader = ({onToggleModal, ...props}) => {
  const {facebookAuth} = useFacebookAuth()
  const {user} = facebookAuth
  const {t} = useTranslation()
  const {data, properties, methods} = useFacebookFanpage()
  const {filter, fanpage} = data

  return (
    <StyledFacebookFanpageHeader {...props}>
      <div className="facebook-fanpage-header__container">
        <div className="facebook-fanpage-header__content">
          <Text as="h1" color="#fff" fontSize={24} lineHeight={34}>
            Quản lý kết nối Fanpage
          </Text>
          <Text as="div" color="#fff" style={{marginBottom: 24}}>
            Quản lý bán hàng và lên đơn trực tiếp trên kênh Fanpage &
            Livestream.
          </Text>
          <Text as="div" color="#fff" style={{marginBottom: 4}}>
            <Text as="b" color="#fff" fontSize={15} lineHeight={22}>
              {filter.connected
                ? 'Danh sách trang đã kết nối'
                : 'Danh sách trang chưa kết nối'}
            </Text>{' '}
            <Text color="#fff" lineHeight={22}>
              - Tài khoản của bạn được kết nối tối đa {fanpage.maxConnection}{' '}
              fanpage (Đã kết nối: {properties.connectedList.length}/
              {fanpage.maxConnection})
            </Text>{' '}
            <Tooltip
              className="alert-address"
              placement="bottom"
              title={
                <span>
                  <span style={{display: 'block', textAlign: 'center'}}>
                    Nếu bạn có nhu cầu kết nối nhiều trang hơn, vui lòng
                  </span>
                  <span style={{display: 'block', textAlign: 'center'}}>
                    {' '}
                    liên hệ với evoshop qua hotline 1900 1088 để được hỗ trợ.
                  </span>
                </span>
              }
            >
              <i
                style={{
                  marginLeft: 4,
                  display: 'inline-block',
                  transform: 'translateY(3px)',
                }}
              >
                {FACEBOOK_ICONS.question}
              </i>
            </Tooltip>
          </Text>
          {filter.connected && (
            <Text as="i" color="#FFB733" fontWeight={500}>
              Lưu ý: Bạn chỉ có thể thực hiện truy cập đối với các trang có
              quyền quản trị
            </Text>
          )}
        </div>
        <div className="facebook-fanpage-header__action">
          <div className="facebook-fanpage-header__action-upper">
            {properties.connectedList.length > 0 && (
              <FacebookFanpage__SettingBtn />
            )}
            <FacebookFanpage__Avatar
              avatar={user.avatar}
              name={user.name}
              style={{marginLeft: 16}}
              onToggleLogoutModal={onToggleModal}
            />
          </div>
          <div className="facebook-fanpage-header__action-below">
            {filter.connected ? (
              <>
                <Text
                  color="#fff"
                  style={{cursor: 'pointer'}}
                  onClick={() =>
                    properties.canMultipleDisconnect
                      ? methods.unselectAllConnectedFanpages()
                      : methods.selectAllConnectedFanpages()
                  }
                >
                  {properties.canMultipleDisconnect
                    ? t('unselect_all')
                    : t('select_all')}
                </Text>
                <FacebookFanpage__DisconnectBtn
                  disabled={!properties.canMultipleDisconnect}
                  size="md-"
                  style={{minWidth: 106, marginLeft: 12}}
                  onClick={() => {
                    const check = methods.handleAskPermissionSelect({
                      onSubmit: () => {
                        setTimeout(
                          () => onToggleModal && onToggleModal('disconnect'),
                          100,
                        )
                      },
                    })

                    if (!check) onToggleModal && onToggleModal('disconnect')
                  }}
                />
                <FacebookFanpage__AccessBtn
                  size="md-"
                  style={{minWidth: 103, marginLeft: 12}}
                />
              </>
            ) : (
              <>
                {properties.isExistedConnectedFanpage && (
                  <Text
                    color="#fff"
                    style={{marginRight: 16, cursor: 'pointer'}}
                    onClick={() => {
                      methods.toggleFilterConnected(true)
                      methods.unselectAllDisconnectedFanpages()
                    }}
                  >
                    Quay lại danh sách trang đã kết nối
                  </Text>
                )}
                <FacebookFanpage__ConnectBtn
                  disabled={!properties.canMultipleConnect}
                  size="md-"
                  style={{minWidth: 134}}
                  onClick={() => onToggleModal && onToggleModal('connect')}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </StyledFacebookFanpageHeader>
  )
}
