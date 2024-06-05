import { StyledBrowser } from './_styled'
import { useState } from 'react'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { Text } from '../../../../../../../common/text'

export const Browser = ({ title, ...props }) => {

  const [showContent, setShowContent] = useState(true)
  return (
    <StyledBrowser>
      <div className="info-step" data-success={true}>
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{FACEBOOK_ICONS.check_success}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className="browser-content">
            <div className="browser-content__item">
              <img src="/img/browser/coccoc.png" alt="coc coc"/>
              <Text as={'p'} fontWeight={600} style={{marginTop: '12px'}}>Cốc cốc</Text>
            </div>
            <div className="browser-content__item">
              <img src="/img/browser/firefox.png" alt="firefox"/>
              <Text as={'p'} fontWeight={600} style={{marginTop: '12px'}}>Fire Fox</Text>
            </div>
            <div className="browser-content__item">
              <img src="/img/browser/chrome.png" alt="Google chrome"/>
              <Text as={'p'} fontWeight={600} style={{marginTop: '12px'}}>Google Chrome</Text>
            </div>
            <div className="browser-content__item">
              <img src="/img/browser/edg.png" alt="Internet Explorer ( Microsoft Edge)"/>
              <Text as={'p'} fontWeight={600} style={{marginTop: '12px'}}>Internet Explorer</Text>
              <Text as={'p'} fontWeight={400}>( Microsoft Edge)</Text>
            </div>
          </div>
        </div>
      </div>
    </StyledBrowser>
  )
}