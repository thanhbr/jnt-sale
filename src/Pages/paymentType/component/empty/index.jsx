import {Button} from 'common/button'
import {Text} from 'common/text'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";
import {useContext} from "react";
import {PaymentTypeContext} from "../../provider/context";
import {PaymentTypeActions} from "../../provider/action";

export const OrderEmpty = ({...props}) => {
    const {changeSearch} = usePaymentTypeModal()
    const {pageState,pageDispatch} = useContext(PaymentTypeContext)
    const shouldShowCreateBtn = !!!changeSearch.value
    const openCreate = ()=>{
        pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                create_payment:true,
            }})
    }
  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? 'Bạn chưa có loại phiếu chi nào.'
          : 'Không tìm thấy loại phiếu chi phù hợp'}
      </Text>
      {shouldShowCreateBtn && (
        <Button onClick={openCreate} icon={ORDER_ICONS.plus}>Tạo mới loại phiếu chi</Button>
      )}
    </StyledOrderEmpty>
  )
}
