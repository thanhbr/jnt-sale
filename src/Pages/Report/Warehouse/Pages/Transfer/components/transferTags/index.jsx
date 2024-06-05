import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useTransferFilterForm from 'Pages/Report/Warehouse/Pages/Transfer/hooks/useTransferFilterForm'
import {ORDER_FILTER_TAG_FIELDS} from 'Pages/Report/Warehouse/Pages/Transfer/interfaces/_constants'
import {StyledTransferTags} from './_styled'
import {TransferTag} from './_tag'
import { useTranslation } from 'react-i18next'

export const TransferTags = ({...props}) => {
  const {
    dateTime,
    warehouse,
    receiveWarehouse,
    functions,
  } = useTransferFilterForm()
  const {t} = useTranslation()
  const shouldShowResetAll = functions.hasFilter()

  const handleDeleteAll = () => functions.filterTagDeleteAll()

  return (
    <StyledTransferTags {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <TransferTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </TransferTag>
      )}
      {warehouse?.activeValue?.name && (
        <TransferTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])}
        >
          {t('warehouse_export')}: {warehouse.activeValue.name}
        </TransferTag>
      )}
      {receiveWarehouse?.activeValue?.name && (
        <TransferTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])}
        >
          {t('init_warehouse')}: {receiveWarehouse.activeValue.name}
        </TransferTag>
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
    </StyledTransferTags>
  )
}
