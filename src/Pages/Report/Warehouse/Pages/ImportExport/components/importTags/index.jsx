import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {StyledImportTags} from './_styled'
import {ImportTag} from './_tag'
import useImportFilterForm from "../../hooks/useImportFilterForm";
import {ORDER_FILTER_TAG_FIELDS} from "../../interfaces/_constants";
import { useTranslation } from 'react-i18next'

export const ImportTags = ({...props}) => {
  const {
    dateTime,
    warehouse,
    functions,
    category
  } = useImportFilterForm()
  const {t} = useTranslation()
  const shouldShowResetAll = functions.hasFilter()

  const handleDeleteAll = () => functions.filterTagDeleteAll()
  return (
    <StyledImportTags {...props}>
      {dateTime?.activeValue?.value && (
        <ImportTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t('time')}: {dateTime.activeValue.value}
        </ImportTag>
      )}
      {warehouse?.activeValue?.name && (
        <ImportTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])}
        >
          {t('general_warehouse')}: {warehouse.activeValue.name}
        </ImportTag>
      )}
      {category?.categoryActive && (
        <ImportTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])}
        >
          {t('product_page_group_product')}: {category?.categoryActive}
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
