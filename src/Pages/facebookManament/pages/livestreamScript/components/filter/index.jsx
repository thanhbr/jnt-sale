import {StyledFacebookLivestreamScriptFilter} from './_styled'
import {Input} from 'common/form/input'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {FacebookLivestreamScript_FanpageAutocomplete} from '../_fanpageAutocomplete'
import useFacebookLiveStreamScript from '../../hooks/useFacecbookLivestreamScript'

export const FacebookLivestreamScriptFilter = ({...props}) => {
  const {data, searchMethods} = useFacebookLiveStreamScript()
  const {search} = data.filter

  return (
    <StyledFacebookLivestreamScriptFilter {...props}>
      <div className="facebook-livestream-script-filter__container">
        <div className="facebook-livestream-script-filter__input">
          <Input
            placeholder="Tìm kiếm theo tên kịch bản"
            icon={FACEBOOK_ICONS.search}
            value={search.value}
            onChange={searchMethods.onChange}
          />
        </div>
        <div className="facebook-livestream-script-filter__input">
          <FacebookLivestreamScript_FanpageAutocomplete />
        </div>
      </div>
    </StyledFacebookLivestreamScriptFilter>
  )
}
