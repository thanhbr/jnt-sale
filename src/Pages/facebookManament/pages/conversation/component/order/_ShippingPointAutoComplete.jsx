import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import styled from 'styled-components'
import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import {AutoCompleteSingleOption} from './__AutoCompleteSingleOption'

export const ShippingPointAutoComplete = ({...props}) => {
  const {data, shippingMethods} = useFacebookConversationOrder()
  const {shippingPoint} = data.shippingInfo

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Điểm gửi hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 50,
        categoryHidden: true,
        label: 'Điểm gửi hàng',
        placeholder: 'Chọn điểm gửi hàng',
        readOnly: true,
        value: shippingPoint.value?.name || '',
      }}
      // menu
      menuProps={{
        canLoadMore: !shippingPoint.loadingMore,
        empty:
          shippingPoint.list.length <= 0 ? 'Không tìm thấy điểm gửi hàng' : '',
        style: {paddingBottom: 0},
        onLoadMore: () =>
          !shippingPoint.loadingMore &&
          shippingMethods.onShippingPoint.loadMore(),
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm điểm gửi hàng',
        value: shippingPoint.keyword,
        onChange: shippingMethods.onShippingPoint.keywordChange,
      }}
    >
      {shippingPoint.loading ? (
        <StyledLoading>
          <Spinner size={54} thickness={5} />
          <Text style={{marginTop: 5}}>Loading...</Text>
        </StyledLoading>
      ) : (
        <>
          {shippingPoint.list.map(item => (
            <AutoCompleteSingleOption
              key={item?.value}
              data-active={item.value === shippingPoint.value?.value}
              onClick={() => shippingMethods.onShippingPoint.change(item)}
            >
              {item?.name || '---'}
            </AutoCompleteSingleOption>
          ))}
          {shippingPoint.loadingMore && (
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
