import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import styled from 'styled-components'
import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import {AutoCompleteSingleOption} from './__AutoCompleteSingleOption'

export const PaymentMethodAutoComplete = ({...props}) => {
  const {data, paymentMethods} = useFacebookConversationOrder()
  const {method} = data.paymentInfo

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Phương thức thanh toán', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 50,
        categoryHidden: true,
        label: 'Phương thức thanh toán',
        placeholder: 'Chọn phương thức thanh toán',
        readOnly: true,
        value: method.value?.name || '',
      }}
      // menu
      menuProps={{
        canLoadMore: !method.loadingMore,
        empty:
          method.list.length <= 0
            ? 'Không tìm thấy phương thức thanh toán'
            : '',
        style: {paddingBottom: 0, width: '300px'},
        onLoadMore: () =>
          !method.loadingMore && paymentMethods.onMethod.loadMore(),
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm phương thức thanh toán',
        value: method.keyword,
        onChange: paymentMethods.onMethod.keywordChange,
      }}
    >
      {method.loading ? (
        <StyledLoading>
          <Spinner size={54} thickness={5} />
          <Text style={{marginTop: 5}}>Loading...</Text>
        </StyledLoading>
      ) : (
        <>
          {method.list.map(item => (
            <AutoCompleteSingleOption
              key={item?.value}
              data-active={item.value === method.value?.value}
              onClick={() => paymentMethods.onMethod.change(item)}
            >
              {item?.name || '---'}
            </AutoCompleteSingleOption>
          ))}
          {method.loadingMore && (
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
