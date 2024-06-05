import {Text} from 'common/text'
import UseEmployeeFilterForm from 'Pages/Report/Sales/Pages/Employee/hooks/useEmployeeFilterForm'
import {StyledOrderEmpty} from './_styled'
import { useTranslation } from 'react-i18next'

export const EmployeeEmpty = ({...props}) => {
  const {badge, search, dateTime} = UseEmployeeFilterForm()
  const {t} = useTranslation()

  const shouldShowCreateBtn =
    badge.others < 1 &&
    !!!search.value &&
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
