import { Popper } from 'common/popper'
import { Text } from 'common/text'
import { FACEBOOK_ICONS } from 'Pages/facebookManament/interfaces/_icons'
import useFacebookFanpage from '../../hooks/useFacebookFanpage'
import {
  StyledFacebookFanpage__AccessBtn,
  StyledFacebookFanpage__AccessPopper,
} from './_styled'
import { useNavigate } from 'react-router-dom'
import useGlobalContext from 'containerContext/storeContext'

export const FacebookFanpage__AccessBtn = ({ popperProps, ...props }) => {
  const [GlobalState] = useGlobalContext()
  const { data, methods } = useFacebookFanpage()
  const { fanpage } = data
  const accessFanpage = fanpage.selected.length > 0 ? fanpage.selected.filter(item => !!item.manage_permission).map(item => item.page_id) : GlobalState.facebook.fanpage.filter(item => !!item.manage_permission).map(item => item.page_id)
  const navigate = useNavigate()
  const options = [
    {
      id: 1,
      name: 'Quản lý hội thoại',
      icon: FACEBOOK_ICONS.messenger,
      onClick: () => navigate(`/facebook/conversation${accessFanpage.length > 0 ? '?page_id=' + accessFanpage.toString() : ''}`)
    },
    {
      id: 2,
      name: 'Quản lý livestream',
      icon: FACEBOOK_ICONS.livestream,
      onClick: () => navigate(`/facebook/livestream${accessFanpage.length > 0 ? '?page_id=' + accessFanpage.toString() : ''}`)
    },
    {
      id: 3,
      name: 'Quản lý đơn hàng',
      icon: FACEBOOK_ICONS.handBag,
      onClick: () => navigate(`/facebook/orders${accessFanpage.length > 0 ? '?page_id=' + accessFanpage.toString() : ''}`)
    },
  ]

  return (
    <Popper
      {...popperProps}
      placement={popperProps?.placement || 'bottom-end'}
      renderPopper={
        popperProps?.renderPopper
          ? popperProps.renderPopper()
          : () => (
            <StyledFacebookFanpage__AccessPopper>
              {options.map(item => (
                <div
                  key={item.id}
                  className="facebook-fanpage-access-popper__item"
                  onClick={() => {
                    const check = methods.handleAskPermissionSelect({
                      onSubmit: () => item?.onClick && item.onClick(),
                    })

                    if (!check) item?.onClick && item.onClick()
                  }}
                >
                  <i className="facebook-fanpage-access-popper__item-icon">
                    {item.icon}
                  </i>
                  <Text>{item.name}</Text>
                </div>
              ))}
            </StyledFacebookFanpage__AccessPopper>
          )
      }
      popperProps={{
        style: { top: 'calc(100% + 12px)', padding: 8 },
        ...popperProps,
      }}
    >
      <StyledFacebookFanpage__AccessBtn
        {...props}
        icon={props?.icon || FACEBOOK_ICONS.chevronDown}
        iconPosition={props?.iconPosition || 'back'}
      >
        Truy cập
      </StyledFacebookFanpage__AccessBtn>
    </Popper>
  )
}
