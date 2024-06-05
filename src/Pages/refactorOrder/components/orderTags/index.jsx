import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_FILTER_TAG_FIELDS} from 'Pages/refactorOrder/interfaces/_constants'
import {orderInitialState} from 'Pages/refactorOrder/provider/_reducer'
import { useContext } from 'react'
import {StyledOrderTags} from './_styled'
import {OrderTag} from './_tag'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

export const OrderTags = ({...props}) => {
  const {
    dateTime,
    duplicate,
    employee,
    product,
    shippingPartner,
    shippingStatus,
    source,
    warehouse,
    functions,
  } = useOrderFilterForm()

  const shouldShowResetAll = functions.hasFilter()

  const handleDeleteAll = () => functions.filterTagDeleteAll()

  return (
    <StyledOrderTags {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {dateTime.activeValue.type.name}: {dateTime.activeValue.value}
        </OrderTag>
      )}
      {Array.isArray(employee.activeValue?.value) &&
        employee.activeValue.type.name !== 'Nhóm nhân viên' && (
          <OrderTag
            onDelete={() =>
              functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[8])
            }
          >
            {'Nhóm nhân viên'}:{' '}
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
            {'Nhân viên'}:{' '}
            {employee.activeValue.value.map(item => item?.name).join(', ')}
          </OrderTag>
        )}
      {Array.isArray(shippingStatus.activeValue) &&
        shippingStatus.activeValue.length > 0 && (
          <OrderTag
            onDelete={() =>
              functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])
            }
          >
            Trạng thái đơn hàng:{' '}
            {shippingStatus.activeValue.map(item => item?.name).join(', ')}
          </OrderTag>
        )}
      {shippingPartner?.activeValue?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[3])}
        >
          Đối tác vận chuyển: {shippingPartner.activeValue.name}
        </OrderTag>
      )}
      {Array.isArray(product.activeValue) && product.activeValue.length > 0 && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[4])}
        >
          Sản phẩm:{' '}
          {product.activeValue
            .map(item => item?.data?.sku || 'unknown')
            .join(', ')}
        </OrderTag>
      )}
      {source?.activeValue?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[5])}
        >
          Nguồn đơn hàng: {source.activeValue.name}
        </OrderTag>
      )}
      {warehouse?.activeValue?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[6])}
        >
          Kho: {warehouse.activeValue.name}
        </OrderTag>
      )}
      {duplicate?.activeValue?.value === '1' && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[7])}
        >
          {duplicate.activeValue.name}
        </OrderTag>
      )}
      {shouldShowResetAll && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          Đặt lại mặc định
        </Text>
      )}
    </StyledOrderTags>
  )
}
