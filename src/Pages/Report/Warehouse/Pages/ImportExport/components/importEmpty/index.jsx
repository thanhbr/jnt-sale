import {Text} from 'common/text'
import useImportFilterForm from "../../hooks/useImportFilterForm";
import {StyledImportEmpty} from "./_styled";
import { useTranslation } from 'react-i18next'

export const ImportEmpty = ({...props}) => {
  const {badge, search} = useImportFilterForm()

  const shouldShowCreateBtn =
    badge.others <= 1 && !badge.advanced && !!!search.value

  const {t} = useTranslation()
  return (
    <StyledImportEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/report/report-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginTop: 16}}>
        {shouldShowCreateBtn
          ? t('no_datas')
          : t('general_not_data_found')}
      </Text>
    </StyledImportEmpty>
  )
}
