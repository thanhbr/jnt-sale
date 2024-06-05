import * as React from 'react'
import {StyledCustomHeader} from "./_styledCustomHeader";
import useGlobalContext from '../../../../../containerContext/storeContext'
import { FACEBOOK_ICONS } from '../../../interfaces/_icons'
import { Text } from '../../../../../common/text'
import { FacebookFanpageLayoutGeneral__Avatar } from '../../general/__avatar'
import { FacebookLayoutGeneral__ActionBtn } from '../../general/__actionBtn'
import {useSearchParams,useLocation} from "react-router-dom";

export default function CustomHeader(
  {
    authData,
    setShouldOpenLogoutModal,
    headerTitle,
    ...props
  }
) {
   const [state] = useGlobalContext()
   const accessFanpage = state.facebook.fanpage.filter(item => !!item.manage_permission).map(item => item.page_id)
 
   const location = useLocation();
   const path = location.pathname
   return state.isLogin ? (
      <StyledCustomHeader>
         <div className="custom-header-facebook flex">
           {headerTitle
             ?
              headerTitle
             :
             <div className={'custom-header-facebook__left'}>
               <Text fontSize={'20px'} lineHeight={'140%'} color={'#2374E1'} fontWeight={600}>Bán hàng Facebook</Text>
             </div>
           }
            <div className={'custom-header-facebook__right'}>
                {path !== '/facebook/conversation' &&  <FacebookLayoutGeneral__ActionBtn
                    tooltip="Quản lý hội thoại"
                    icon={FACEBOOK_ICONS.chatCircleDots}
                    href={`/facebook/conversation${accessFanpage.length > 0 ? '?page_id=' + accessFanpage.toString() : ''}`}
                />}
                {path !== '/facebook/livestream' &&  <FacebookLayoutGeneral__ActionBtn
                    tooltip="Quản lý Livestream"
                    icon={FACEBOOK_ICONS.livestream01}
                    href={`/facebook/livestream${accessFanpage.length > 0 ? '?page_id=' + accessFanpage.toString() : ''}`}
                />}
                {path !== '/facebook/orders' &&  <FacebookLayoutGeneral__ActionBtn
                    tooltip="Quản lý đơn hàng Facebook"
                    icon={FACEBOOK_ICONS.handBag01}
                    href={`/facebook/orders${accessFanpage.length > 0 ? '?page_id=' + accessFanpage.toString() : ''}`}
                />}

               <FacebookLayoutGeneral__ActionBtn
                  tooltip="Quản lý trang kết nối"
                  icon={FACEBOOK_ICONS.facebookAnchor}
                  href={'/facebook'}
               />
               <FacebookLayoutGeneral__ActionBtn
                  tooltip="Cấu hình"
                  icon={FACEBOOK_ICONS.gearSix2}
                  href={'/facebook/conversation-stickers'}
               />
               <Text
                  style={{
                     borderLeft: '1px solid #C8CBD4',
                     height: '44px',
                     display: 'inline-block',
                     paddingRight: '12px',
                  }}
               />
               <FacebookFanpageLayoutGeneral__Avatar
                  avatar={authData?.user?.avatar}
                  name={authData?.user?.name}
                  onToggleLogoutModal={setShouldOpenLogoutModal}
               />
            </div>
         </div>
      </StyledCustomHeader>
   ) : null
}
