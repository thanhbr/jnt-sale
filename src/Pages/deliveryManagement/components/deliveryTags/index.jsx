import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useDeliveryFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import {ORDER_FILTER_TAG_FIELDS} from 'Pages/deliveryManagement/interfaces/_constants'
import {StyledDeliveryTags} from './_styled'
import {DeliveryTag} from './_tag'
import {DeliveryInitialState} from '../../provider/initState'
import {useContext, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useState} from 'react'
import {DeliveryContext} from 'Pages/deliveryManagement/provider/_context'
import {useTranslation} from 'react-i18next'

export const DeliveryTags = ({...props}) => {
  const {t, i18n} = useTranslation()
  const {pageState} = useContext(DeliveryContext)
  const {table} = pageState
  const {
    dateTime,
    duplicate,
    employee,
    downtime,
    allocation,
    product,
    shippingPartner,
    shippingStatus,
    print,
    cod,
    functions,
  } = useDeliveryFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
      JSON.stringify(DeliveryInitialState.filter.dateTime.activeValue),

    !!employee?.activeValue?.value?.name && !!employee?.activeValue?.type?.name,

    Array.isArray(shippingStatus.activeValue) &&
      shippingStatus.activeValue.length > 0,

    !!shippingPartner?.activeValue?.name,

    !!print?.activeValue?.name,

    Array.isArray(product.activeValue) && product.activeValue.length > 0,

    duplicate?.activeValue?.value === '1',
    // duplicate?.activeValue?.value !== '',
    downtime?.activeValue !== '',
    allocation?.activeValue !== '',
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledDeliveryTags
      {...props}
      style={{display: querySearch ? 'block' : 'block'}}
    >
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </DeliveryTag>
      )}
      {Array.isArray(shippingStatus.activeValue) &&
        shippingStatus.activeValue.length > 0 && (
          <DeliveryTag
            onDelete={() =>
              functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])
            }
          >
            {t('order_status')}:{' '}
            {shippingStatus.activeValue.map(item => item?.name).join(', ')}
          </DeliveryTag>
        )}
      {shippingPartner?.activeValue?.name && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])}
        >
          {t('delivery_partner')}: {shippingPartner.activeValue.name}
        </DeliveryTag>
      )}
      {Array.isArray(product.activeValue) && product.activeValue.length > 0 && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[3])}
        >
          {t('product')}:{' '}
          {product.activeValue
            .map(item => item?.data?.sku || 'unknown')
            .join(', ')}
        </DeliveryTag>
      )}
      {print?.activeValue?.value && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[4])}
        >
          {t('order_print_count')}: {t(print.activeValue.name)}
        </DeliveryTag>
      )}
      {duplicate?.activeValue?.value === '1' && (
        <DeliveryTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[5])}
        >
          {t(duplicate.activeValue.name)}
        </DeliveryTag>
      )}
      {downtime?.activeValue && (
        <DeliveryTag
          onDelete={() => {
            functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[6])
          }}
        >
          {t('new_interaction_stop_time')}: {t(downtime.activeValue)}
        </DeliveryTag>
      )}
      {cod?.activeValue && (
        <DeliveryTag
          onDelete={() => {
            functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[7])
          }}
        >
          {t('partial_cod_edit')}: {t(cod.activeValue.name)}
        </DeliveryTag>
      )}
      {allocation?.activeValue && (
        <DeliveryTag
          onDelete={() => {
            functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[8])
          }}
        >
          {t('allocation_time')}: {allocation.activeValue}
        </DeliveryTag>
      )}
      {shouldShowResetAll && (
        <Text
          color={table.loading ? THEME_SEMANTICS.delivering : 'gray'}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          {t('reset_default')}
        </Text>
      )}
    </StyledDeliveryTags>
  )
}
