import {Drawer} from '@mui/material'
import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderSingleExtraInfo from 'Pages/orderSingle/hooks/useOrderSingleExtraInfo'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from '../../autocompleteSingleOption'
import {CreateSourceDrawer} from '../../createSourceDrawer'

export const OrderSingleExtraInfoSource = ({...props}) => {
  const {data, properties, methods} = useOrderSingleExtraInfo()
  const {source} = data

  const [isModified, setIsModified] = useState(false)
  const [isSmallDesktop, setIsSmallDesktop] = useState(screen.width < 1600)

  const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false)
  const [shouldOpenConfirmModal, setShouldOpenConfirmModal] = useState(false)
  const [shouldOpenLoadingModal, setShouldOpenLoadingModal] = useState(false)

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods.onSourceLoadMore()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
  }

  const handleWindowResize = () => {
    if (window.screen.width < 1600) {
      if (!isSmallDesktop) setIsSmallDesktop(true)
    } else {
      if (isSmallDesktop) setIsSmallDesktop(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return (
    <>
      <AlternativeAutoComplete
        {...props}
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: {name: 'Nguồn đơn hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 110,
          categoryHidden: true,
          label: 'Nguồn đơn hàng',
          placeholder: 'Chọn nguồn đơn hàng',
          readOnly: true,
          value: source.value?.name || '',
        }}
        // menu
        menuProps={{
          canLoadMore,
          empty: source.list.length <= 0 ? 'Không tìm thấy nguồn đơn hàng' : '',
          style: {
            width: isSmallDesktop ? '100%' : 'calc(200% + 16px)',
            paddingBottom: 0,
          },
          onLoadMore: handleLoadMore,
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm kiếm nguồn đơn hàng',
          value: source.keyword,
          onChange: methods.onSourceKeywordChange,
        }}
      >
        {properties.isSourceLoading ? (
          <StyledLoading>
            <Spinner size={54} thickness={5} />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </StyledLoading>
        ) : (
          <>
            {source.list.map(item => (
              <AutoCompleteSingleOption
                key={item?.value}
                data-active={item.value === source.value?.value}
                onClick={() => methods.onSourceChange(item)}
              >
                {item?.name || '---'}
              </AutoCompleteSingleOption>
            ))}
            {!canLoadMore && (
              <StyledLoadMore>
                <Spinner size={48} thickness={4} />
              </StyledLoadMore>
            )}
            {!(source.keyword.trim() && source.list.length <= 0) && (
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
        <CreateSourceDrawer
          exit={shouldOpenConfirmModal}
          loading={shouldOpenLoadingModal}
          onClose={() => setShouldOpenDrawer(false)}
          onExitToggle={setShouldOpenConfirmModal}
          onLoadingToggle={setShouldOpenLoadingModal}
          onModified={setIsModified}
          onRefetch={() => methods.onSourceKeywordChange({value: ''})}
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
        <Text color={THEME_SEMANTICS.delivering}>Thêm nguồn đơn hàng</Text>
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
