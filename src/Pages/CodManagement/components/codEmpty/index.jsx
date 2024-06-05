import {Button} from 'common/button'
import {Text} from 'common/text'
import useCodFilterForm from '../../hooks/useCodFilterForm'
import {StyledOrderEmpty} from './_styled'
import {useTranslation} from "react-i18next";

export const CodEmpty = ({...props}) => {
  const { t } = useTranslation()
  const {badge, search, dateTime, employee, shippingStatus, statusComparing, shippingPartner} = useCodFilterForm()

  const shouldShowCreateBtn =
    !badge.advanced &&
    !!!search.value &&
    !!!dateTime.activeValue.value &&
    !!!shippingPartner.value &&
    !!!employee.activeValue?.name &&
    !!!statusComparing?.activeValue?.name &&
    (Array.isArray(shippingStatus.activeValue) &&
      shippingStatus.activeValue.length <= 0) &&
    !!!shippingPartner?.activeValue?.name
    

  return (
    <StyledOrderEmpty {...props}>
       {shouldShowCreateBtn
          ?
      <img
        className="order-empty__banner"
        src="/img/cod-manager/cod-empty.png"
        alt="empty"
      /> : 
      <img
        className="order-empty__banner"
        src="/img/cod-manager/order-empty.png"
        alt="empty"
      />}
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? t("no_cod_order")
          : t("find_no_data")}
      </Text>
    </StyledOrderEmpty>
  )
}
