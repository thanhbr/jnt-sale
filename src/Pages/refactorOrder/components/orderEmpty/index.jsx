import {Button} from 'common/button'
import {Text} from 'common/text'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'

export const OrderEmpty = ({...props}) => {
  const {badge, search} = useOrderFilterForm()

  const shouldShowCreateBtn =
    badge.others <= 1 && !badge.advanced && !!!search.value

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? 'Bạn chưa có đơn hàng nào'
          : 'Không tìm thấy dữ liệu phù hợp'}
      </Text>
      {shouldShowCreateBtn && (
        <Button href={'/orders/create'} icon={ORDER_ICONS.plus}>Tạo mới đơn hàng</Button>
      )}
    </StyledOrderEmpty>
  )
}
