import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import { ForControlCODContext } from 'Pages/ForControlCOD/Tab2/provider/_context'
import useForControlCODFilterForm from 'Pages/ForControlCOD/Tab2/hooks/useForControlCODFilterForm'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ForControlCODInitialState } from '../../provider/initState'
import { StyledForControlCODTags } from './_styled'
import { ForControlCODTag } from './_tag'
import {useTranslation} from "react-i18next";

export const ForControlCODTags = ({...props}) => {
  const {pageState} = useContext(ForControlCODContext)
  const { t } = useTranslation();
  const {table} = pageState
  const {
    dateTime,
    // duplicate,
    // employee,
    // downtime,
    // allocation,
    // product,
    // shippingPartner,
    // shippingStatus,
    // print,
    // cod,
    functions,
  } = useForControlCODFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(ForControlCODInitialState.filter.dateTime.activeValue),

    // !!employee?.activeValue?.value?.name && !!employee?.activeValue?.type?.name,

    // Array.isArray(shippingStatus.activeValue) &&
    //   shippingStatus.activeValue.length > 0,

    // !!shippingPartner?.activeValue?.name,
    
    // !!print?.activeValue?.name,

    // Array.isArray(product.activeValue) && product.activeValue.length > 0,

    // duplicate?.activeValue?.value === '1',
    // // duplicate?.activeValue?.value !== '',
    // downtime?.activeValue !== '',
    // allocation?.activeValue !== '',
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledForControlCODTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <ForControlCODTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </ForControlCODTag>
      )}
      {/* {Array.isArray(shippingStatus.activeValue) &&
        shippingStatus.activeValue.length > 0 && (
          <ForControlCODTag
            onDelete={() =>
              functions.filterTagDelete(ForControlCOD_FILTER_TAG_FIELDS[1])
            }
          >
            Trạng thái đơn hàng:{' '}
            {shippingStatus.activeValue.map(item => item?.name).join(', ')}
          </ForControlCODTag>
        )}
      {shippingPartner?.activeValue?.name && (
        <ForControlCODTag
          onDelete={() => functions.filterTagDelete(ForControlCOD_FILTER_TAG_FIELDS[2])}
        >
          Đối tác vận chuyển: {shippingPartner.activeValue.name}
        </ForControlCODTag>
      )}
      {Array.isArray(product.activeValue) && product.activeValue.length > 0 && (
        <ForControlCODTag
          onDelete={() => functions.filterTagDelete(ForControlCOD_FILTER_TAG_FIELDS[3])}
        >
          Sản phẩm:{' '}
          {product.activeValue
            .map(item => item?.data?.sku || 'unknown')
            .join(', ')}
        </ForControlCODTag>
      )}
      {print?.activeValue?.value && (
        <ForControlCODTag
          onDelete={() => functions.filterTagDelete(ForControlCOD_FILTER_TAG_FIELDS[4])}
        >
          Số lần in đơn: {print.activeValue.name}
        </ForControlCODTag>
      )}
      {duplicate?.activeValue?.value === '1' && (
        <ForControlCODTag
          onDelete={() => functions.filterTagDelete(ForControlCOD_FILTER_TAG_FIELDS[5])}
        >
          {duplicate.activeValue.name}
        </ForControlCODTag>
      )}
      {downtime?.activeValue && (
        <ForControlCODTag
          onDelete={() => {
            functions.filterTagDelete(ForControlCOD_FILTER_TAG_FIELDS[6])}}
        >
          Thời gian ngừng nhận tương tác mới: {downtime.activeValue}
        </ForControlCODTag>
      )}
      {cod?.activeValue && (
        <ForControlCODTag
          onDelete={() => {
            functions.filterTagDelete(ForControlCOD_FILTER_TAG_FIELDS[7])}}
        >
          Sửa COD đơn 1 phần: {cod.activeValue.name}
        </ForControlCODTag>
      )}

      {allocation?.activeValue && (
        <ForControlCODTag
          onDelete={() => {
            functions.filterTagDelete(ForControlCOD_FILTER_TAG_FIELDS[8])}}
        >
          Thời gian cấp phát: {allocation.activeValue}
        </ForControlCODTag>
      )} */}
      {shouldShowResetAll && (
        <Text
          color={table.loading ? THEME_SEMANTICS.delivering : 'gray'}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          {t("general_reset_to_default")}
        </Text>
      )}
    </StyledForControlCODTags>
  )
}
