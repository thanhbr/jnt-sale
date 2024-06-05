import {Button} from 'common/button'
import {Text} from 'common/text'
import UsePurchasesFilterForm from 'Pages/purchases/hooks/useFilter'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'

export const PurchasesEmpty = ({...props}) => {
  const {badge, search, dateTime} = UsePurchasesFilterForm()

  const shouldShowCreateBtn =
    badge.others <= 1 &&
    !!!search.value &&
    !!!dateTime.activeValue.value

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? 'Bạn chưa có phiếu nhập hàng nào'
          : 'Không tìm thấy dữ liệu phù hợp'}
      </Text>
      {shouldShowCreateBtn && (
        <Button href={'/purchase/create'} icon={ORDER_ICONS.plus}>
          Tạo mới phiếu nhập hàng
        </Button>
      )}
    </StyledOrderEmpty>
  )
}
