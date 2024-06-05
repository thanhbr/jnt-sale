import {Text} from 'common/text'
import useImportFilterForm from 'Pages/Report/Warehouse/Pages/Import/hooks/useImportFilterForm'
import { StyledOrderEmpty } from '../../../../../Sales/Pages/ProductRevenue/components/productRevenueEmpty/_styled'
import { useTranslation } from 'react-i18next'

export const ImportEmpty = ({...props}) => {
  const {badge, search} = useImportFilterForm()
  const {t} = useTranslation()
  const shouldShowCreateBtn =
    badge.others <= 1 && !badge.advanced && !!!search.value


  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner productRevenue-management-table__row"
        src="/img/report/report-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? t('no_import_activity')
          : t('general_not_data_found')}
      </Text>
    </StyledOrderEmpty>
  )
}
