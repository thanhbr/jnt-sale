import { StyledBasicInFo } from './_styled'
import React, { useState } from 'react'
import {Text} from "../../../../../../../../common/text";
import {Switch} from "../../../../../../../../common/switch";
import {FACEBOOK_ICONS} from "../../../../../../interfaces/_icons";
import Skeleton from "@mui/material/Skeleton";
import {THEME_SEMANTICS} from "../../../../../../../../common/theme/_semantics";

export const BasicInfo = ({title,...props}) => {
  const data = {}
  const [showContent,setShowContent] = useState(true)
  return (
    <StyledBasicInFo>
      <div className="info-step" data-success={!!data?.fanPage?.value?.name && !!data?.scriptName}>
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{(!!data?.fanPage?.value?.name && !!data?.scriptName) ? FACEBOOK_ICONS.check_success : FACEBOOK_ICONS.radio}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className={'form-step__top flex'}>
            <div style={{width: 'calc(50% - 22px)', marginRight: '22px'}}>
              <Text as={'label'}>Trang áp dụng <Text color={THEME_SEMANTICS.failed}>*</Text></Text>
              <Skeleton variant="rounded" width={'100%'} height={34}/>
            </div>
            <div style={{width: 'calc(50% - 22px)', marginLeft: '22px'}}>
              <Text as={'label'}>Tên kịch bản <Text color={THEME_SEMANTICS.failed}>*</Text></Text>
              <Skeleton variant="rounded" width={'100%'} height={34}/>
            </div>
          </div>
          <div className={'form-step__bottom flex'} style={{alignItems: 'center'}}>
            <div style={{marginRight: '8px'}}><Skeleton variant="text" width={34} height={30} /></div>
            <Skeleton variant="text" width={'110px'} height={26}/>
          </div>
        </div>
      </div>
    </StyledBasicInFo>
  )
}