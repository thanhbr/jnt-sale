import {Text} from 'common/text'
import UseOrderOriginFilterForm from 'Pages/Report/Sales/Pages/OrderOrigin/hooks/useOrderOriginFilterForm'
import {StyledOrderEmpty} from './_styled'
import { useTranslation } from 'react-i18next'

export const OrderOriginEmpty = ({...props}) => {
  const {badge, dateTime} = UseOrderOriginFilterForm()
  const {t} = useTranslation()

  const shouldShowCreateBtn =
    badge.others < 1 &&
    !!!dateTime.activeValue.value

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/report/report-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? t('no_datas')
          : t('general_not_data_found')}
      </Text>
    </StyledOrderEmpty>
  )
}
