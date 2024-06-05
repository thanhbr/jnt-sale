import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import usePartSignFilterForm from 'Pages/partSign/hooks/usePartSignFilterForm'
import {ORDER_FILTER_TAG_FIELDS} from 'Pages/partSign/interfaces/_constants'
import {StyledDeliveryTags} from './_styled'
import {DeliveryTag} from './_tag'
import { DeliveryInitialState } from '../../provider/initState'
import {useTranslation} from "react-i18next";

export const PartSignTags = ({...props}) => {
  const {
    dateTime,
    shippingPartner,
    adminUser,
    orderOrigin,
    functions,
  } = usePartSignFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(DeliveryInitialState.filter.dateTime.activeValue),
    !!shippingPartner?.activeValue?.name,
    !!adminUser?.activeValue?.name,
    !!orderOrigin?.activeValue?.name,
  ].includes(true)

  const handleDeleteAll = () => functions.filterTagDeleteAll()
  const { t } = useTranslation()
  
  return (
    <StyledDeliveryTags {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </DeliveryTag>
      )}
      {shippingPartner?.activeValue?.name && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])}
        >
          {t("shipping_partner_pr")}: {shippingPartner.activeValue.name}
        </DeliveryTag>
      )}
      {adminUser?.activeValue?.value && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])}
        >
          {t("order_closing_staff")} : {adminUser.activeValue.name}
        </DeliveryTag>
      )}
      {orderOrigin?.activeValue?.value && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[3])}
        >
          {t("source_order")} : {orderOrigin.activeValue.name}
        </DeliveryTag>
      )}
      {shouldShowResetAll && (
        <Text
          color={THEME_SEMANTICS.delivering}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          {t("general_reset_to_default")}
        </Text>
      )}
    </StyledDeliveryTags>
  )
}
