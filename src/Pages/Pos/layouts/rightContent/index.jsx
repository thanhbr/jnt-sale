import { StyledRightContent } from './styled'
import { HeaderPos } from './header'
import ContentRight from "./content";
import ModalPaymentMethod from "./modal/paymentMethod";
import usePosPayment from "../../hooks/usePosPayment";
import ResponseSubmit from "./modal/responseSubmit";
import {PrintDetail} from "./content/_printDetail";
import ConfirmOrder from "./modal/confirmOrder";

export const RightContentPos = () => {
  const {modals} = usePosPayment()
  return (
    <StyledRightContent>
      <HeaderPos/>
      <ContentRight />
      <PrintDetail />

      {modals?.paymentMethod?.open && <ModalPaymentMethod />}
      {modals?.responseSubmit?.open && <ResponseSubmit />}
      {modals?.confirmOrder?.open && <ConfirmOrder />}
    </StyledRightContent>
  )
}