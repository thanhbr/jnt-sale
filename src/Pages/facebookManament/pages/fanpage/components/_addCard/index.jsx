import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {StyledFacebookFanpage__AddCard} from './_styled'

export const FacebookFanpage__AddCard = ({...props}) => {
  return (
    <StyledFacebookFanpage__AddCard {...props}>
      <div className="facebook-fanpage-add-card__icon">
        <i>{FACEBOOK_ICONS.plus}</i>
      </div>
      <Text
        as="div"
        className="facebook-fanpage-add-card__text"
        color={THEME_SEMANTICS.delivering}
        fontWeight={600}
        style={{width: 75, textAlign: 'center'}}
      >
        Thêm trang kết nối
      </Text>
    </StyledFacebookFanpage__AddCard>
  )
}
