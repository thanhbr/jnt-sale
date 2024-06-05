import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import useOrderSinglePaymentMethod from 'Pages/orderSingle/hooks/useOrderSinglePaymentMethod'
import {AutoCompleteSingleOption} from '../../../../components/autocompleteSingleOption'
import {ORDER_SINGLE_ICONS} from "../../../../interface/_icons";
import {Text} from "../../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../../common/theme/_semantics";
import styled from "styled-components";
import React, {useState} from "react";
import useEditModal from "../../../../hooks/useEditModal";
import {Spinner} from "../../../../../../common/spinner";

export const OrderSinglePaymentMethodType = ({...props}) => {
  const {functions} = useEditModal()
  const {data, properties, methods} = useOrderSinglePaymentMethod()
  const {method} = data

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods.onMethodLoadMore()
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
          categoryValue: {name: 'Phương thức thanh toán', value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 110,
          categoryHidden: true,
          label: 'Phương thức thanh toán',
          placeholder: 'Chọn phương thức thanh toán',
          readOnly: true,
          value: method.value?.name || '',
        }}
        // menu
        menuProps={{
          canLoadMore,
          empty:
            method.list.length <= 0
              ? 'Không tìm thấy phương thức thanh toán'
              : '',
          onLoadMore: handleLoadMore,
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm kiếm phương thức thanh toán',
          value: method.keyword,
          onChange: methods.onMethodKeywordChange,
        }}
      >
        {properties.isMethodLoading ? (
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
                onClick={() => methods.onMethodChange(item)}
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
        <CreateBox onClick={() => functions.handleToggleModalPaymentMethod()} />
      </AlternativeAutoComplete>
    </>
  )
}

const CreateBox = ({...props}) => {
  return (
    <StyledCreateBox {...props}>
      <div className="create-box__container">
        <i style={{margin: '4px 4px 0 0'}}>{ORDER_SINGLE_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>Thêm phương thức thanh toán</Text>
      </div>
    </StyledCreateBox>
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

const StyledCreateBox = styled(Text)`
  position: sticky;
  bottom: -12px;
  z-index: 1;

  height: 48px;
  width: 100% !important;

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
