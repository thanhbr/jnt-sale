import {Drawer} from '@mui/material'
import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useWarehouseGeneralInfo from 'Pages/CreateWarehouseTransfer/hooks/useWarehouseGeneralInfo'
import {WAREHOUSE_TS_ICONS} from 'Pages/CreateWarehouseTransfer/interface/_icons'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from '../../autocompleteSingleOption'

export const WarehouseTSImport = ({...props}) => {
  const {data, validate, properties, methods} = useWarehouseGeneralInfo()
  const {warehouseImport, warehouseList, warehouseKeyword} = data

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods.onWarehouseLoadMore()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
  }
  
  const handleChangeItem = (item) => {
    methods.validateWarehouse('warehouseImport', item)
    methods.handleWarehouseChange('import', item)
  }

  return (
    <>
      <AlternativeAutoComplete
        {...props}
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: {name: 'Kho nhập hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 110,
          categoryHidden: true,
          label: (
            <>
              Kho nhập hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
            </>
          ),
          placeholder: 'Chọn kho nhập hàng',
          readOnly: true,
          value: warehouseImport?.name || '',
          validateText: validate.warehouseImport,
          validateType: 'danger'
        }}
        // menu
        menuProps={{
          canLoadMore,
          empty: warehouseList?.list?.length <= 0 ? 'Không tìm thấy kho nhập hàng' : '',
          style: {
            width: '100%',
            paddingBottom: 0,
          },
          onLoadMore: handleLoadMore,
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm kiếm kho nhập hàng',
          value: warehouseKeyword,
          onChange: methods.onWarehouseKeywordChange,
        }}
      >
        {properties.isWarehouseLoading ? (
          <StyledLoading>
            <Spinner size={54} thickness={5} />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </StyledLoading>
        ) : (
          <>
            {warehouseList?.list?.map(item => {
              if(+item.data?.is_purchase == 1)
                return (
                  <AutoCompleteSingleOption
                    key={item?.value}
                    data-active={item.value === warehouseImport?.value}
                    onClick={() => handleChangeItem(item)}
                  >
                    {item?.name || '---'}
                  </AutoCompleteSingleOption>
                )
            })}
            {!canLoadMore && (
              <StyledLoadMore>
                <Spinner size={48} thickness={4} />
              </StyledLoadMore>
            )}
            {/* {!(warehouseKeyword.trim() && warehouseList?.list?.length <= 0) && (
              <CreateBox onClick={() => methods.setOpenCreateModal(true)} />
            )} */}
          </>
        )}
      </AlternativeAutoComplete>
    </>
  )
}

const StyledLoading = styled.div`
  min-height: 260px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLoadMore = styled.div`
  padding: 16px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

const CreateBox = ({...props}) => {
  return (
    <StyledCreateBox {...props}>
      <div className="create-box__container">
        <i style={{marginRight: 4}}>{WAREHOUSE_TS_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>Thêm Kho nhập hàng</Text>
      </div>
    </StyledCreateBox>
  )
}

const StyledCreateBox = styled(Text)`
  position: sticky;
  bottom: 0;
  z-index: 1;

  width: 100% !important;
  height: 48px;

  display: block;

  background: #fff;

  cursor: pointer;

  .create-box {
    &__container {
      height: 100%;

      display: flex;
      align-items: center;
    }
  }
`
