import {Drawer} from '@mui/material'
import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import React, {useState} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from '../../autocompleteSingleOption'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'

export const FanPageFacebook = ({...props}) => {
  const {data, properties, methods} = useCreateFacebookAutoResponses()
  const { fanPage } = data

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods?.onFanPageLoadMore()
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
          categoryValue: {name: 'Trang áp dụng', value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 110,
          categoryHidden: true,
          label: (<>
            Trang áp dụng <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>),
          placeholder: 'Chọn trang áp dụng',
          readOnly: true,
          value: fanPage?.value?.name || '',
          validateText: data?.validate?.basicInfo?.page || '',
          validateType: "danger"
        }}
        // menu
        menuProps={{
          canLoadMore,
          empty:
            fanPage?.list.length <= 0
              ? 'Không tìm thấy trang'
              : '',
          style: {paddingBottom: 0},
          onLoadMore: handleLoadMore,
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm trang',
          value: fanPage?.keyword,
          onChange: methods?.onFanPageKeywordChange,
        }}
      >
        {properties?.isFanPageLoading ? (
          <StyledLoading>
            <Spinner size={54} thickness={5} />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </StyledLoading>
        ) : (
          <div style={{margin: '16px 0'}}>
            {fanPage?.list?.length > 0 && fanPage?.list.map(item => (
              <AutoCompleteSingleOption
                key={item?.value}
                data-active={item?.value === fanPage?.value?.value}
                onClick={() => methods?.onFanPageChange(item)}
                style={{marginBottom: '16px'}}
              >
                <img
                  src={item?.data.page_avatar}
                  alt={item?.data.page_name}
                  className="page-image"
                  style={{width: '44px',height: '44px',marginRight: '16px', borderRadius: '50%'}}
                />
                {item?.name || '---'}
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
