import {Drawer} from '@mui/material'
import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import React, {useState} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from '../../../autocompleteSingleOption'
import {CreatePaymentMethodDrawer} from '../../../createPaymentMethodDrawer'
import useRefundPurchasePaymentVendor from '../../../../hooks/useRefundPurchasePaymentVendor'

export const RefundPaymentMethodType = ({...props}) => {
  const {data,validate, properties, methods} = useRefundPurchasePaymentVendor()
  const {paymentMethod} = data
  const [isModified, setIsModified] = useState(false)

  const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false)
  const [shouldOpenConfirmModal, setShouldOpenConfirmModal] = useState(false)
  const [shouldOpenLoadingModal, setShouldOpenLoadingModal] = useState(false)

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
          label: (<>
            <Text>Phương thức thanh toán</Text> <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>),
          placeholder: 'Chọn phương thức thanh toán',
          readOnly: true,
          value: paymentMethod?.value?.name || '',
          validateText: validate?.method || '',
          validateType: "danger",
        }}
        // menu
        menuProps={{
          canLoadMore,
          empty:
            paymentMethod?.list.length <= 0
              ? 'Không tìm thấy phương thức thanh toán'
              : '',
          onLoadMore: handleLoadMore,
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm kiếm phương thức thanh toán',
          value: paymentMethod?.keyword,
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
            {paymentMethod?.list.map(item => (
              <AutoCompleteSingleOption
                key={item?.value}
                data-active={item.value === paymentMethod?.value?.value}
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
            {!(paymentMethod?.keyword.trim() && paymentMethod?.list.length <= 0) && (
              <CreateBox onClick={() => setShouldOpenDrawer(true)} />
            )}
          </>
        )}
      </AlternativeAutoComplete>
      <StyledRightDrawer
        anchor="right"
        open={shouldOpenDrawer}
        onClose={() =>
          isModified
            ? setShouldOpenConfirmModal(true)
            : setShouldOpenDrawer(false)
        }
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: -24,
            width: 24,
            height: 24,
            cursor: 'pointer',
          }}
          onClick={e => {
            e.stopPropagation()
            if (isModified) setShouldOpenConfirmModal(true)
            else setShouldOpenDrawer(false)
          }}
        >
          {ORDER_SINGLE_ICONS.x01}
        </div>
        <CreatePaymentMethodDrawer
          exit={shouldOpenConfirmModal}
          loading={shouldOpenLoadingModal}
          onClose={() => setShouldOpenDrawer(false)}
          onExitToggle={setShouldOpenConfirmModal}
          onLoadingToggle={setShouldOpenLoadingModal}
          onModified={setIsModified}
          onRefetch={() => methods.onMethodKeywordChange({value: ''})}
        />
      </StyledRightDrawer>
    </>
  )
}

const StyledRightDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    height: calc(100% - 3.5rem);
    margin-top: 3.5rem;

    overflow: unset;
  }
`

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
        <i style={{marginRight: 4}}>{ORDER_SINGLE_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>
          Thêm phương thức thanh toán
        </Text>
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

  transform: translateY(12px);

  cursor: pointer;

  .create-box {
    &__container {
      height: 100%;

      display: flex;
      align-items: center;
    }
  }
`
