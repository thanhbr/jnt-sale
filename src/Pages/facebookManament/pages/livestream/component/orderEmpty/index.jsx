import {Button} from 'common/button'
import {Text} from 'common/text'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";

export const OrderEmpty = ({...props}) => {
  const {badge, search} = useFacebookFilterForm()

  const shouldShowCreateBtn =
    badge.others <= 1 && !badge.advanced && !!!search.value

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="livestream-empty__banner"
        src="/img/livestream/Empty state.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? 'Không tìm thấy bài viết.'
          : 'Không tìm thấy bài viết'}
      </Text>
    </StyledOrderEmpty>
  )
}
