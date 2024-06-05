import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {useState} from 'react'
import {FacebookLivestreamScriptSingle_FanpageLogoModal} from '../_fanpageLogoModal'
import {StyledFacebookLivestreamScriptSingle_FanpageLogoList} from './_styled'

export const FacebookLivestreamScriptSingle_FanpageLogoList = ({
  list,
  value,
  onChange,
  ...props
}) => {
  const [shouldOpenModal, setShouldOpenModal] = useState(false)

  return (
    <>
      <StyledFacebookLivestreamScriptSingle_FanpageLogoList {...props}>
        {value
          .filter((item, i) => i < 6)
          .map((item, i) => (
            <div
              key={item?.value}
              className="facebook-livestream-script-single-fanpage-logo-list__item"
              onClick={() => setShouldOpenModal(true)}
            >
              <img src={item?.data?.page_avatar} alt={item?.page_name} />
              {value.length >= 7 && i === 5 && (
                <div className="facebook-livestream-script-single-fanpage-logo-list__cover">
                  +{value.length - 5}
                </div>
              )}
            </div>
          ))}
        <div
          className="facebook-livestream-script-single-fanpage-logo-list__create"
          style={{marginLeft: value.length > 0 ? 8 : 0}}
          onClick={() => setShouldOpenModal(true)}
        >
          {FACEBOOK_ICONS.plus03}
        </div>
        {value.length <= 0 && (
          <Text
            as="b"
            color={THEME_SEMANTICS.delivering}
            lineHeight={32}
            style={{marginLeft: 8, cursor: 'pointer'}}
            onClick={() => setShouldOpenModal(true)}
          >
            Thêm trang
          </Text>
        )}
      </StyledFacebookLivestreamScriptSingle_FanpageLogoList>
      {shouldOpenModal && (
        <FacebookLivestreamScriptSingle_FanpageLogoModal
          defaultValue={value}
          list={list}
          onClose={() => setShouldOpenModal(false)}
          onSubmit={onChange}
        />
      )}
    </>
  )
}
