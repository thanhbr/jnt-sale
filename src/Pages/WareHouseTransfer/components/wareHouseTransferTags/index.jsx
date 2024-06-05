import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useWareHouseTransferFilterForm from 'Pages/WareHouseTransfer/hooks/useWareHouseTransferFilterForm'
import {WAREHOUSE_TS_FILTER_TAG_FIELDS} from 'Pages/WareHouseTransfer/interfaces/_constants'
import {StyledWareHouseTransferTags} from './_styled'
import {WareHouseTransferTag} from './_tag'
import { wareHouseTransferInitialState } from '../../provider/initState'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { WareHouseTransferContext } from 'Pages/WareHouseTransfer/provider/_context'

export const WareHouseTransferTags = ({...props}) => {
  const {pageState} = useContext(WareHouseTransferContext)
  const {table} = pageState
  const {
    dateTime,
    warehouseExport,
    warehouseImport,
    createdUser,
    functions,
  } = useWareHouseTransferFilterForm()
  
  const shouldShowResetAll = [
    !!dateTime?.activeValue?.value,
    !!warehouseExport?.activeValue,
    !!warehouseImport?.activeValue,
    createdUser?.activeValue?.length > 0,
  ].includes(true)


  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledWareHouseTransferTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <WareHouseTransferTag
          onDelete={() => functions.filterTagDelete('dateTime')}
        >
          {dateTime.activeValue.type.name}: {dateTime.activeValue.value}
        </WareHouseTransferTag>
      )}
      {warehouseExport?.activeValue?.value && (
        <WareHouseTransferTag
          onDelete={() => functions.filterTagDelete('warehouseExport')}
        >
          Kho xuất hàng: {warehouseExport.activeValue.name}
        </WareHouseTransferTag>
      )}
      {warehouseImport?.activeValue?.value && (
        <WareHouseTransferTag
          onDelete={() => functions.filterTagDelete('warehouseImport')}
        >
          Kho nhập hàng: {warehouseImport.activeValue.name}
        </WareHouseTransferTag>
      )}
      {!!createdUser?.activeValue?.length && (
        <WareHouseTransferTag
          onDelete={() => functions.filterTagDelete('createdUser')}
        >
          Nhân viên thực hiện: {createdUser.activeValue.map(x => x.name).join(', ')}
        </WareHouseTransferTag>
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
          Đặt lại mặc định
        </Text>
      )}
    </StyledWareHouseTransferTags>
  )
}
