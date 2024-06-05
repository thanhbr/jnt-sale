import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import styled from 'styled-components'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle__AutocompleteSingleOption} from '../__autocompleteSingleOption'

export const FacebookLivestreamScriptSingle_WarehouseAutocomplete = ({
  ...props
}) => {
  const {data, declareOrderKeywordMethods} = useFacebookLiveStreamScriptSingle()
  const {warehouse} = data.form

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
          !warehouse.loadingMore &&
          declareOrderKeywordMethods.handleWarehouseLoadMore(),
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm kho',
        value: warehouse.keyword,
        onChange: declareOrderKeywordMethods.handleWarehouseKeywordChange,
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
            <FacebookLivestreamScriptSingle__AutocompleteSingleOption
              key={item?.value}
              data-active={item.value === warehouse.value?.value}
              onClick={() =>
                declareOrderKeywordMethods.handleWarehouseChange(item)
              }
            >
              {item?.name || '---'}
            </FacebookLivestreamScriptSingle__AutocompleteSingleOption>
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
