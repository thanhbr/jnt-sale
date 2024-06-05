import {Button} from 'common/button'
import {Text} from 'common/text'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";
import {useContext} from "react";
import {FacebookOrdersContext} from "../../provider/_context";

export const OrderEmpty = ({...props}) => {
  const {badge, search} = useFacebookFilterForm()
    const {pageState, pageDispatch} = useContext(FacebookOrdersContext)
    const shouldShowCreateBtn =
        badge.others < 1 && !!!search.value && !(badge.paymentValue.length < 3 && pageState?.table?.display?.list.length === 0)

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/facebook/empty-order.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? 'Bạn chưa có đơn hàng nào từ nguồn Facebook.'
          : 'Không tìm thấy dữ liệu phù hợp'}
      </Text>
    </StyledOrderEmpty>
  )
}
