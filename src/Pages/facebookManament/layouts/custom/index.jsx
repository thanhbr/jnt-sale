import {StyledCustom} from "./styledCustom";
import CustomHeader from './header/customheader'
import { CustomSidebar } from './sidebar/custom'
import { FacebookLayoutGeneralLogoutModal } from '../general/logoutModal'
import { useState } from 'react'

export const CustomLayout = (
  {
    sidebar,
    subTitle,
    description,
    breadcrumb,
    authData,
    actions,
    logout,
    ...props
  }
) => {
  const [shouldOpenLogoutModal, setShouldOpenLogoutModal] = useState(false)
  return (
    <StyledCustom>
      <div className={'facebook-layout'}>
        <CustomHeader authData={authData}
                      setShouldOpenLogoutModal={setShouldOpenLogoutModal}
                      headerTitle={props?.headerTitle}
        />
        <CustomSidebar>{sidebar}</CustomSidebar>
        {props.children}
      </div>
      {shouldOpenLogoutModal && (
        <FacebookLayoutGeneralLogoutModal
          onClose={() => setShouldOpenLogoutModal(false)}
          onSubmit={logout}
        />
      )}
    </StyledCustom>
  )

}