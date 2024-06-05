import { StyledBasicInFo } from './_styled'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { Text } from '../../../../../../../common/text'
import { FanPageFacebook } from './_page'
import { ScriptNameInput } from './_scriptName'
import { Switch } from '../../../../../../customer/components/switch'
import { useState } from 'react'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'

export const BasicInfo = ({title,...props}) => {

  const {data, methods} = useCreateFacebookAutoResponses()
  const [showContent,setShowContent] = useState(true)
  return (
    <StyledBasicInFo>
      <div className="info-step" data-success={!!data?.fanPage?.value?.name && !!data?.scriptName}>
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{(!!data?.fanPage?.value?.name && !!data?.scriptName) ? FACEBOOK_ICONS.check_success : FACEBOOK_ICONS.radio}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
          <div onClick={() => setShowContent(!showContent)} data-arrow={!showContent} className={'title-step__arrow'}>{FACEBOOK_ICONS.up_arrow}</div>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className={'form-step__top flex'}>
            <FanPageFacebook style={{marginRight: '44px', width: '48%'}}/>
            <ScriptNameInput width={'50%'}/>
          </div>
          <div className={'form-step__bottom flex'}>
            <Switch checked={data?.scriptStatus} style={{marginRight: '8px'}}
                    onChange={methods.onScriptStatusChange}
            />
            <Text>Kích hoạt/Ngưng sử dụng kịch bản</Text>
          </div>
        </div>
      </div>
    </StyledBasicInFo>
  )
}