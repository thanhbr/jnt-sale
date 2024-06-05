import {Text} from 'common/text'
import {FACEBOOK_CONSTANTS} from 'Pages/facebookManament/interfaces/_constants'
import {useLocation} from 'react-router-dom'
import {StyledFacebookLayoutGeneralSidebar} from './_styled'
import useGlobalContext from '../../../../../containerContext/storeContext'

export const FacebookLayoutGeneralSidebar = ({...props}) => {
  const location = useLocation()
  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const {changed} = GlobalState.facebookAuth

  const leavePage = path => {
    GlobalDispatch({
      type: 'UPDATE_CHANGE_STATUS',
      payload: {
        showPopup: true,
        link: path,
      },
    })
  }

  return (
    <StyledFacebookLayoutGeneralSidebar {...props}>
      <div className="facebook-layout-general-sidebar__list">
        {FACEBOOK_CONSTANTS.generalSidebarList.map(item =>
          !changed.status ? (
            <Text
              key={item.id}
              as="a"
              className="facebook-layout-general-sidebar__list-item"
              href={item.href}
              data-active={location.pathname.startsWith(item.href)}
            >
              <div className="facebook-layout-general-sidebar__icon">
                {item.icon}
              </div>
              <div className="facebook-layout-general-sidebar__text">
                {item.name}
              </div>
            </Text>
          ) : (
            <Text
              key={item.id}
              as="p"
              className="facebook-layout-general-sidebar__list-item"
              onClick={() => leavePage(item.href)}
              data-active={location.pathname.startsWith(item.href)}
            >
              <div className="facebook-layout-general-sidebar__icon">
                {item.icon}
              </div>
              <div className="facebook-layout-general-sidebar__text">
                {item.name}
              </div>
            </Text>
          ),
        )}
      </div>
    </StyledFacebookLayoutGeneralSidebar>
  )
}
