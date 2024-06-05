import {Button} from 'common/button'
import {Text} from 'common/text'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useWareHouseTransferFilterForm from 'Pages/WareHouseTransfer/hooks/useWareHouseTransferFilterForm'
import {StyledOrderEmpty} from './_styled'

export const WareHouseTransferEmpty = ({...props}) => {
  const {badge, search} = useWareHouseTransferFilterForm()

  const shouldShowCreateBtn =
    badge.others <= 0 &&
    !badge.advanced &&
    !!!search.value

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? 'Bạn chưa có phiếu chuyển kho nào.'
          : 'Không tìm thấy dữ liệu phù hợp'}
      </Text>
      {shouldShowCreateBtn && (
        <Button href={'/warehouse/transfer/create'} icon={ORDER_ICONS.plus}>
          Tạo mới phiếu chuyển kho
        </Button>
      )}
    </StyledOrderEmpty>
  )
}
