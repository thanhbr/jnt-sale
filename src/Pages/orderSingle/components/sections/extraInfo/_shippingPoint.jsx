import {Drawer} from '@mui/material'
import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderSingleExtraInfo from 'Pages/orderSingle/hooks/useOrderSingleExtraInfo'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useState} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from '../../autocompleteSingleOption'
import {CreateShippingPointDrawer} from '../../createShippingPointDrawer'

export const OrderSingleExtraInfoShippingPoint = ({...props}) => {
  const {data, properties, methods} = useOrderSingleExtraInfo()
  const {shippingPoint} = data

  const [isModified, setIsModified] = useState(false)

  const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false)
  const [shouldOpenConfirmModal, setShouldOpenConfirmModal] = useState(false)
  const [shouldOpenLoadingModal, setShouldOpenLoadingModal] = useState(false)

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods.onShippingPointLoadMore()
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
          categoryValue: {name: 'Điểm gửi hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 110,
          categoryHidden: true,
          label: 'Điểm gửi hàng',
          placeholder: 'Chọn điểm gửi hàng',
          readOnly: true,
          value: shippingPoint.value?.name || '',
        }}
        // menu
        menuProps={{
          canLoadMore,
          empty:
            shippingPoint.list.length <= 0
              ? 'Không tìm thấy điểm gửi hàng'
              : '',
          style: {paddingBottom: 0},
          onLoadMore: handleLoadMore,
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm kiếm điểm gửi hàng',
          value: shippingPoint.keyword,
          onChange: methods.onShippingPointKeywordChange,
        }}
      >
        {properties.isShippingPointLoading ? (
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
                onClick={() => methods.onShippingPointChange(item)}
              >
                {item?.name || '---'}
              </AutoCompleteSingleOption>
            ))}
            {!canLoadMore && (
              <StyledLoadMore>
                <Spinner size={48} thickness={4} />
              </StyledLoadMore>
            )}
            {!(
              shippingPoint.keyword.trim() && shippingPoint.list.length <= 0
            ) && <CreateBox onClick={() => setShouldOpenDrawer(true)} />}
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
        <CreateShippingPointDrawer
          exit={shouldOpenConfirmModal}
          loading={shouldOpenLoadingModal}
          onClose={() => setShouldOpenDrawer(false)}
          onExitToggle={setShouldOpenConfirmModal}
          onLoadingToggle={setShouldOpenLoadingModal}
          onModified={setIsModified}
          onRefetch={() => methods.onShippingPointKeywordChange({value: ''})}
        />
      </StyledRightDrawer>
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

const StyledRightDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    height: calc(100% - 3.5rem);
    margin-top: 3.5rem;

    overflow: unset;
  }
`

const CreateBox = ({...props}) => {
  return (
    <StyledCreateBox {...props}>
      <div className="create-box__container">
        <i style={{marginRight: 4}}>{ORDER_SINGLE_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>Thêm điểm gửi hàng</Text>
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
