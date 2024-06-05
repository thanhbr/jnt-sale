import {Button} from 'common/button'
import {Text} from 'common/text'
import UseCashBooksFilterForm from 'Pages/CashBooks/hooks/useCashBooksFilterForm'
import {formatDateTimeCashBookDefaultValue} from 'Pages/CashBooks/provider/initState'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import {useTranslation} from 'react-i18next'

export const CashBooksEmpty = ({...props}) => {
  const {t} = useTranslation()
  const {badge, search, dateTime, paymentMethod, receiptType} =
    UseCashBooksFilterForm()

  const shouldShowCreateBtn =
    badge.others <= 1 &&
    !!!search.value &&
    dateTime.activeValue.value === formatDateTimeCashBookDefaultValue &&
    paymentMethod.activeValue.length <= 0 &&
    !!!receiptType.activeValue.value?.value &&
    receiptType.activeValue.type.value === '0'

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? t('cashbook_no_activity')
          : t('cashbook_no_data_found')}
      </Text>
      {/* {shouldShowCreateBtn && (
        <Button href={'/orders/create'} icon={ORDER_ICONS.plus}>
          Tạo mới đơn hàng
        </Button>
      )} */}
    </StyledOrderEmpty>
  )
}
