import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useCodFilterForm from '../../hooks/useCodFilterForm'
import {ORDER_FILTER_TAG_FIELDS} from '../../interfaces/_constants'
import {StyledCodTags} from './_styled'
import {CodTag} from './_tag'
import { CodInitialState } from '../../provider/initState'
import {useTranslation} from "react-i18next";

export const CodTags = ({...props}) => {
  const {
    dateTime,
    employee,
    shippingPartner,
    shippingStatus,
    statusComparing,
    functions,
  } = useCodFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(CodInitialState.filter.dateTime.activeValue),
    !!employee.activeValue?.name,
    !!statusComparing?.activeValue?.name,
    Array.isArray(shippingStatus.activeValue) &&
      shippingStatus.activeValue.length > 0,
    !!shippingPartner?.activeValue?.name
  ].includes(true)
  const { t } = useTranslation()

  const handleDeleteAll = () => functions.filterTagDeleteAll()
  
  return (
    <StyledCodTags {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <CodTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </CodTag>
      )}
      {Array.isArray(shippingStatus.activeValue) &&
        shippingStatus.activeValue.length > 0 && (
          <CodTag
            onDelete={() =>
              functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])
            }
          >
            {t("Shipping_status")}:{' '}
            {shippingStatus.activeValue.map(item => item?.name).join(', ')}
          </CodTag>
        )}
      {shippingPartner?.activeValue?.name && (
        <CodTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])}
        >
          {t("Shipping_partner")}: {shippingPartner.activeValue.name}
        </CodTag>
      )}
      {employee?.activeValue?.name && (
        <CodTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[3])}
        >
          {t("order_closing_staff")}: {employee.activeValue.name}
        </CodTag>
      )}
      {statusComparing?.activeValue?.name && (
        <CodTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[4])}
        >
          {t("complete_cod_checked")}: {statusComparing.activeValue.name}
        </CodTag>
      )}
      {shouldShowResetAll && (
        <Text
          color={THEME_SEMANTICS.delivering}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          {t("general_reset_to_default")}
        </Text>
      )}
    </StyledCodTags>
  )
}
