import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import React, {useState} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from '../../autocompleteSingleOption'
import useRefundPurchaseExtraInfo from '../../../hooks/useRefundPurchaseExtraInfo'

export const RefundPurchaseWarehouse = ({...props}) => {
  const {data, properties, methods} = useRefundPurchaseExtraInfo()
  const { warehouse } = data || {}
  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods?.onWarehouseLoadMore()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
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
          label: (<>
            <Text>Kho nhập hàng</Text> {!props?.disabled ? <Text color={THEME_SEMANTICS.failed}>*</Text>: ''}
          </>),
          placeholder: 'Chọn kho nhập hàng',
          readOnly: true,
          value: warehouse?.value?.data?.warehouse_name || '',
          validateText: data?.validate?.warehouse || '',
          validateType: "danger",
          disabled: !!props?.disabled
        }}
        // menu
        menuProps={{
          canLoadMore,
          empty:
            warehouse?.list.length <= 0
              ? 'Không tìm thấy kho nhập hàng'
              : '',
          style: {paddingBottom: 0},
          onLoadMore: handleLoadMore,
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm kho nhập hàng',
          value: warehouse?.keyword,
          onChange: methods?.onWarehouseKeywordChange,
        }}
      >
        {properties?.isFanPageLoading ? (
          <StyledLoading>
            <Spinner size={54} thickness={5} />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </StyledLoading>
        ) : (
          <div style={{margin: '16px 0'}}>
            {warehouse?.list?.length > 0 && warehouse?.list.map(item => (
              <AutoCompleteSingleOption
                key={item?.data?.id}
                data-active={item?.data?.id === warehouse?.value?.value}
                onClick={() => methods?.onWarehouseChange(item)}
                style={{marginBottom: '16px'}}
              >
                <div className="warehouse-modal__info" key={item?.data?.id}>
                  <Text className="warehouse-modal__name">
                    {item?.data?.warehouse_name || '---'}
                  </Text>
                </div>
              </AutoCompleteSingleOption>
            ))}
            {!canLoadMore && (
              <StyledLoadMore>
                <Spinner size={48} thickness={4} />
              </StyledLoadMore>
            )}
          </div>
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
