import { StyledAutoResponseScript } from './_styled'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { Text } from '../../../../../../../common/text'
import { FitCondition } from './_fitCondition'
import { UnfitCondition } from './_unfitCondition'
import { useState } from 'react'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'

export const AutoResponseScript = ({title,...props}) => {

  const {data, methods} = useCreateFacebookAutoResponses()
  const comment = data?.postAndComment?.comment || {}
  const {successFit,successUnfit} = data
  const [showContent,setShowContent] = useState(true)
  return (
    <StyledAutoResponseScript>
      <div className="info-step" data-success={!!successFit && !!successUnfit}>
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{!!successFit && !!successUnfit ? FACEBOOK_ICONS.check_success : FACEBOOK_ICONS.radio}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
          <div onClick={() => setShowContent(!showContent)} data-arrow={!showContent} className={'title-step__arrow'}>{FACEBOOK_ICONS.up_arrow}</div>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className={'form-step__top flex'}>
            <FitCondition style={{marginRight: '44px', width: '48%'}} comment={comment}/>
            {comment?.type == 2 && <UnfitCondition style={{width: '50%'}}/>}
          </div>
        </div>
      </div>
    </StyledAutoResponseScript>
  )
}