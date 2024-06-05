import {Button} from 'common/button'
import {Text} from 'common/text'
import UseDeliveryFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import { useTranslation } from 'react-i18next'

export const DeliveryEmpty = ({...props}) => {
  const { t, i18n } = useTranslation()
  const {badge, search, dateTime} = UseDeliveryFilterForm()

  const shouldShowCreateBtn =
    badge.others <= 1 &&
    !badge.advanced &&
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
          ? t('no_orders_found')
          :  t('no_matching_data')}
      </Text>
      {shouldShowCreateBtn && (
        <Button href={'/orders/create'} icon={ORDER_ICONS.plus}>
          {t('create_new_order')}
        </Button>
      )}
    </StyledOrderEmpty>
  )
}
