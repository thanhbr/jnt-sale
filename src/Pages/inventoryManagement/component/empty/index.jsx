import {Button} from 'common/button'
import {Text} from 'common/text'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";

export const OrderEmpty = ({...props}) => {
  const {badge, search} = useInventoryFilterForm()

  const shouldShowCreateBtn =
    badge.others < 1 && !!!search.value

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? 'Bạn chưa có phiếu kiểm kho nào.'
          : 'Không tìm thấy phiếu kiểm kho phù hợp'}
      </Text>
      {shouldShowCreateBtn && (
        <Button href={'/warehouse/create'} icon={ORDER_ICONS.plus}>Tạo mới phiếu kiểm kho</Button>
      )}
    </StyledOrderEmpty>
  )
}
