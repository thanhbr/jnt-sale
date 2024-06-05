import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import styled from 'styled-components'
import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import {AutoCompleteSingleOption} from './__AutoCompleteSingleOption'

export const WarehouseAutoComplete = ({...props}) => {
  const {data, productMethods} = useFacebookConversationOrder()
  const {warehouse} = data.productInfo.inventoryConfig

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Kho', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 50,
        placeholder: 'Chọn kho',
        readOnly: true,
        value: warehouse.value?.name || '',
      }}
      // menu
      menuProps={{
        canLoadMore: !warehouse.loadingMore,
        empty: warehouse.list.length <= 0 ? 'Không tìm thấy kho' : '',
        style: {paddingBottom: 0},
        onLoadMore: () =>
          !warehouse.loadingMore && productMethods.onWarehouse.loadMore(),
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm kho',
        value: warehouse.keyword,
        onChange: productMethods.onWarehouse.keywordChange,
      }}
    >
      {warehouse.loading ? (
        <StyledLoading>
          <Spinner size={54} thickness={5} />
          <Text style={{marginTop: 5}}>Loading...</Text>
        </StyledLoading>
      ) : (
        <>
          {warehouse.list.map(item => (
            <AutoCompleteSingleOption
              key={item?.value}
              data-active={item.value === warehouse.value?.value}
              onClick={() => productMethods.onWarehouse.change(item)}
            >
              {item?.name || '---'}
            </AutoCompleteSingleOption>
          ))}
          {warehouse.loadingMore && (
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
