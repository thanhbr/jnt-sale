import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useEmployeeFilterForm from 'Pages/Report/Sales/Pages/Employee/hooks/useEmployeeFilterForm'
import { ORDER_FILTER_TAG_FIELDS } from '../../interfaces/_constants'
import { StyledEmployeeTags } from './_styled'
import { EmployeeTag } from './_tag'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EmployeeContext } from 'Pages/Report/Sales/Pages/Employee/provider/_context'
import { OrderTag } from '../../../../../../refactorOrder/components/orderTags/_tag'
import { EmployeeInitialState } from '../../provider/initState'
import { useTranslation } from 'react-i18next'

export const EmployeeTags = ({ ...props }) => {
  const {t} = useTranslation()
  const { pageState } = useContext(EmployeeContext)
  const { table } = pageState
  const {
    dateTime,
    employee,
    shippingPartner,
    source,
    functions
  } = useEmployeeFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(EmployeeInitialState.filter.dateTime.activeValue),
    !!employee?.activeValue?.value?.length > 0 && !!employee?.activeValue?.type?.name,
    !!shippingPartner?.activeValue?.name,
    !!source?.activeValue?.name,
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledEmployeeTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <EmployeeTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </EmployeeTag>
      )}
      {Array.isArray(employee.activeValue?.value) &&
      t(employee.activeValue.type.name) !== t('team_of_employees') && (
        <OrderTag
          onDelete={() =>
            functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[4])
          }
        >
          {t('team_of_employees')}:{' '}
          {employee.activeValue.type.name}
        </OrderTag>
      )}
      {Array.isArray(employee.activeValue?.value) &&
      employee.activeValue.value.length > 0 && (
        <OrderTag
          onDelete={() =>
            functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])
          }
        >
          {t('employee')}:{' '}
          {employee.activeValue.value.map(item => item?.name).join(', ')}
        </OrderTag>
      )}
      {source?.activeValue?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])}
        >
          {t('source_order')}: {source.activeValue.name}
        </OrderTag>
      )}
      {shippingPartner?.activeValue?.name && (
        <EmployeeTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[3])}
        >
          {t('Shipping_partner')}: {shippingPartner.activeValue.name}
        </EmployeeTag>
      )}
      {shouldShowResetAll && (
        <Text
          color={table.loading ? THEME_SEMANTICS.delivering : 'gray'}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{ marginBottom: 12, cursor: 'pointer' }}
          onClick={handleDeleteAll}
        >
          {t('reset_default')}
        </Text>
      )}
    </StyledEmployeeTags>
  )
}
