import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import React, {useState} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from '../../autocompleteSingleOption'
import usePurchaseGeneralInfo from '../../../hooks/usePurchaseGeneralInfo'
import StringUtils from '../../../../orderSingle/utils/string'
import ModalSupplier from '../../../components/modal/index'
import { ORDER_SINGLE_ICONS } from '../../../../orderSingle/interface/_icons'
import { useModalSupplier } from '../../../hooks/useModalSupplier'

export const PurchaseVendor = ({...props}) => {
  const {data,supplier, properties, methods} = usePurchaseGeneralInfo()
  const {function_supplier} = useModalSupplier()
  const { vendor } = data || {}
  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods?.onVendorLoadMore()
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
          categoryValue: {name: 'Nhà cung cấp', value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 110,
          categoryHidden: true,
          label: (<>
            <Text>Nhà cung cấp</Text>  {!props?.disabled ? <Text color={THEME_SEMANTICS.failed}>*</Text>: ''}
          </>),
          placeholder: 'Chọn nhà cung cấp',
          readOnly: true,
          value: vendor?.value?.data?.supplier_name || '',
          validateText: data?.validate?.vendor || '',
          validateType: "danger",
          disabled: !!props?.disabled
        }}
        // menu
        menuProps={{
          canLoadMore,
          empty:
            vendor?.list.length <= 0
              ? 'Không tìm thấy nhà cung cấp'
              : '',
          style: {paddingBottom: 0},
          onLoadMore: handleLoadMore,
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm nhà cung cấp',
          value: vendor?.keyword,
          onChange: methods?.onVendorKeywordChange,
        }}
      >
        {properties?.isFanPageLoading ? (
          <StyledLoading>
            <Spinner size={54} thickness={5} />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </StyledLoading>
        ) : (
          <>
            <div>
              {vendor?.list?.length > 0 && vendor?.list.map(item => (
                <AutoCompleteSingleOption
                  key={item?.data?.supplier_id}
                  data-active={item?.data?.supplier_id === vendor?.value?.data?.supplier_id}
                  onClick={() => methods?.onVendorChange(item)}
                  style={{marginBottom: '16px'}}
                >
                  <div className="vendor-modal__avatar">
                    <Text
                      as="b"
                      color="#fff"
                      fontSize={12}
                      lineHeight={17}
                      style={{textTransform: 'uppercase'}}
                    >
                      {!!item?.data?.supplier_name
                        ? StringUtils.getFirstLetters(item.data.supplier_name).substring(0, 2)
                        : '--'}
                    </Text>
                  </div>
                  <div className="vendor-modal__info">
                    <Text className="vendor-modal__name">
                      {item?.data?.supplier_name || '---'}
                    </Text>
                    <Text color="#7C88A6">
                      {item?.data?.mobile || '---'}
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
            <CreateBox onClick={function_supplier.open_modal} />
          </>
        )}
      </AlternativeAutoComplete>
      <ModalSupplier/>
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

const CreateBox = ({...props}) => {
  return (
    <StyledCreateBox {...props}>
      <div className="create-box__container">
        <i style={{marginRight: 4}}>{ORDER_SINGLE_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>
          Thêm mới nhà cung cấp
        </Text>
      </div>
    </StyledCreateBox>
  )
}

const StyledCreateBox = styled(Text)`
  position: sticky;
  bottom: 12px;
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
