import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import styled from 'styled-components'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle__AutocompleteSingleOption} from '../__autocompleteSingleOption'

export const FacebookLivestreamScriptSingle_ShippingPoint = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {shippingPoint} = data.form

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Điểm gửi hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 110,
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
          shippingInfoMethods.handleShippingPointLoadMore(),
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm điểm gửi hàng',
        value: shippingPoint.keyword,
        onChange: shippingInfoMethods.handleShippingPointKeywordChange,
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
            <FacebookLivestreamScriptSingle__AutocompleteSingleOption
              key={item?.value}
              data-active={item.value === shippingPoint.value?.value}
              onClick={() =>
                shippingInfoMethods.handleShippingPointChange(item)
              }
            >
              {item?.name || '---'}
            </FacebookLivestreamScriptSingle__AutocompleteSingleOption>
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
