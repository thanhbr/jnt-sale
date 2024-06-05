import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useImportFilterForm from 'Pages/Report/Warehouse/Pages/Import/hooks/useImportFilterForm'
import {ORDER_FILTER_TAG_FIELDS} from 'Pages/Report/Warehouse/Pages/Import/interfaces/_constants'
import {StyledImportTags} from './_styled'
import {ImportTag} from './_tag'
import { useTranslation } from 'react-i18next'

export const ImportTags = ({...props}) => {
  const {
    dateTime,
    warehouse,
    supplier,
    functions,
  } = useImportFilterForm()
  const {t} = useTranslation()
  const shouldShowResetAll = functions.hasFilter()

  const handleDeleteAll = () => functions.filterTagDeleteAll()

  return (
    <StyledImportTags {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <ImportTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </ImportTag>
      )}
      {warehouse?.activeValue?.name && (
        <ImportTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])}
        >
          {t('init_warehouse')}: {warehouse.activeValue.name}
        </ImportTag>
      )}
      {supplier?.activeValue?.name && (
        <ImportTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])}
        >
          {t('supplier')}: {supplier.activeValue.name}
        </ImportTag>
      )}
      {shouldShowResetAll && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          {t('general_reset_to_default')}
        </Text>
      )}
    </StyledImportTags>
  )
}
