import useGlobalContext from '../../../../../containerContext/storeContext'
import Notification from '../../../../../Component/Noti-comp/notification'
import UserInformation from '../../../../../Component/UserInformation'
import * as React from 'react'
import { PackageRenewal } from '../../../../../layouts/packageRenewal'
import styled from 'styled-components'
import { Tooltip } from '../../../../../common/tooltip'

export const HeaderPos = () => {
  const [state] = useGlobalContext()
  return (
    <StyleHeader>
      <PackageRenewal/>
      <div style={{marginRight: '24px'}}>
        <Tooltip placement="bottom" title={'Tính năng đang phát triển'}>
          <svg width="35" height="32" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.000396729" width="32" height="32" rx="16" fill="#1A94FF" fill-opacity="0.1"/>
            <path d="M13.3542 25.0004C14.0593 25.6228 14.9855 26.0004 16 26.0004C17.0144 26.0004 17.9407 25.6228 18.6458 25.0004M22 12.0004C22 10.4091 21.3678 8.88297 20.2426 7.75776C19.1174 6.63254 17.5913 6.0004 16 6.0004C14.4087 6.0004 12.8826 6.63254 11.7573 7.75776C10.6321 8.88297 9.99999 10.4091 9.99999 12.0004C9.99999 15.0906 9.22046 17.2064 8.34965 18.6058C7.61512 19.7863 7.24785 20.3765 7.26131 20.5412C7.27622 20.7235 7.31485 20.793 7.46176 20.902C7.59445 21.0004 8.19258 21.0004 9.38884 21.0004H22.6111C23.8074 21.0004 24.4055 21.0004 24.5382 20.902C24.6851 20.793 24.7238 20.7235 24.7387 20.5412C24.7521 20.3765 24.3849 19.7863 23.6503 18.6058C22.7795 17.2064 22 15.0906 22 12.0004Z" stroke="#1A94FF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="20.5" y="0.499908" width="14" height="15" rx="7" fill="#FF424F"/>
            <path d="M24.5907 10.2215V9.01056L27.627 4.22718H28.671V5.90332H28.0531L26.139 8.93244V8.98926H30.4537V10.2215H24.5907ZM28.0815 11.4999V9.85218L28.1099 9.31596V4.22718H29.5517V11.4999H28.0815Z" fill="white"/>
            <rect x="20.5" y="0.499908" width="14" height="15" rx="7" stroke="white"/>
          </svg>
        </Tooltip>
      </div>
      <UserInformation styled={{margin: 0}}/>
    </StyleHeader>
  )
}
const StyleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`