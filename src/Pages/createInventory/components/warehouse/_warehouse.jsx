import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {useState} from 'react'
import styled from 'styled-components'
import useOrderSingleProductInfo from "../../hooks/useOrderSingleProductInfo";
import {AutoCompleteSingleOption} from "../autocompleteSingleOption";
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";

export const OrderSingleProductInfoWarehouse = ({...props}) => {
  const {data, properties, methods} = useOrderSingleProductInfo()
  const {withInventoryConfig} = data

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods.onWarehouseLoadMore()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
  }

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Kho', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 110,
        categoryHidden: true,
        placeholder: 'Chọn kho',
        readOnly: true,
        value: withInventoryConfig.warehouse.value?.name || '',
      }}
      // menu
      menuProps={{
        canLoadMore,
        empty:
          withInventoryConfig.warehouse.list.length <= 0
            ? 'Không tìm thấy kho'
            : '',
        style: {paddingBottom: 0},
        onLoadMore: handleLoadMore,
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm kho',
        value: withInventoryConfig.warehouse.keyword,
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
          {withInventoryConfig.warehouse.list?.map(item => (
            <AutoCompleteSingleOption
              key={item?.value}
              data-active={
                item.value === withInventoryConfig.warehouse.value?.value
              }
              onClick={() => methods.onWarehouseChange(item)}
            >
              {item?.name || '---'}
            </AutoCompleteSingleOption>
          ))}
          {!canLoadMore && (
            <StyledLoadMore>
              <Spinner size={48} thickness={4} />
            </StyledLoadMore>
          )}
        </>
      )}
    </AlternativeAutoComplete>
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
