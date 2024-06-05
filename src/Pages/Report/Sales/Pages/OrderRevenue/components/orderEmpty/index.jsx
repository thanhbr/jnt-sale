import {Text} from 'common/text'
import useOrderFilterForm from 'Pages/Report/Sales/Pages/OrderRevenue/hooks/useOrderFilterForm'
import {StyledOrderEmpty} from './_styled'
import { useTranslation } from 'react-i18next'

export const OrderEmpty = ({...props}) => {
  const {badge, search} = useOrderFilterForm()
  const {t} = useTranslation()
  const shouldShowCreateBtn =
    badge.others <= 1 && !badge.advanced && !!!search.value


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
