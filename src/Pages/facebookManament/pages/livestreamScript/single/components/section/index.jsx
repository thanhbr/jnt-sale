import {Text} from 'common/text'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {useState} from 'react'
import {StyledFacebookLivestreamScriptSingleSection} from './_styled'

export const FacebookLivestreamScriptSingleSection = ({
  heading,
  maxHeightExpand = 100,
  active,
  bodyStyle,
  ...props
}) => {
  const [shouldOpenCollapse, setShouldOpenCollapse] = useState(true)

  return (
    <StyledFacebookLivestreamScriptSingleSection
      {...props}
      data-active={active}
    >
      <div className="facebook-livestream-script-single-section__header">
        <i className="facebook-livestream-script-single-section__header-status">
          {active ? FACEBOOK_ICONS.check_success : FACEBOOK_ICONS.radio}
        </i>
        <Text as="b" fontSize={15} lineHeight={24}>
          {heading}
        </Text>
        <i
          className="facebook-livestream-script-single-section__header-toggle"
          data-expand={shouldOpenCollapse}
          onClick={() => setShouldOpenCollapse(!shouldOpenCollapse)}
        >
          {FACEBOOK_ICONS.up_arrow}
        </i>
      </div>
      <div
        className="facebook-livestream-script-single-section__body"
        data-collapse={shouldOpenCollapse}
        style={{
          maxHeight: shouldOpenCollapse ? maxHeightExpand : 24,
          padding: shouldOpenCollapse ? '24px 24px 8px 24px' : '0 24px',
          overflow: shouldOpenCollapse ? 'unset' : 'hidden',
          ...bodyStyle,
        }}
      >
        {props?.children}
      </div>
    </StyledFacebookLivestreamScriptSingleSection>
  )
}
