import React, { useState } from 'react'
import styled from 'styled-components'
import { Tooltip as TooltipV2 } from 'common/tooltipv2'
import { Text } from 'common/text'
import { usePosQuickProduct } from '../../hooks/usePosQuickProduct'
import { PRODUCT_ICONS } from '../../../product/interfaces/~icon'
import { POS_ICON } from '../../constants/icons'
import { AlternativeAutoComplete } from '../autocompleteSearch/_alternativeAutoComplete'

const GroupProduct = () => {
  const { groupProduct } = usePosQuickProduct()
  const [focusParent, setFocusParent] = useState('')

  const groupProductList = groupProduct?.list
  const groupProductChild = groupProduct?.listChildTwo
  const groupProductSearch = groupProduct?.search

  return (
    <StyledProductFilterGroupProductForm>
      <AlternativeAutoComplete
        className="order-filter-form__input-wide"
        // main input
        inputProps={{
          categoryHidden: true,
          categoryList: [], // menu list in category dropdown
          categoryValue: { name: 'Nhóm sản phẩm', value: '' }, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 130,
          placeholder: 'Nhóm sản phẩm',
          readOnly: true,
          value: groupProduct?.value,
          onIconClick: () => groupProduct.onSelectChild(null),
          icon: POS_ICON.downArrow
        }}
        // menu
        menuProps={{
          empty: groupProductList?.length <= 0 ? 'Không tìm thấy nhóm sản phẩm' : '',
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm nhóm sản phẩm',
          // value: province.keyword || '',
          onChange: groupProduct.onGroupProductKeywordChange,
        }}
      >
        <>
          <div style={{ display: 'flex' }}>
            {(groupProductList?.length > 0 && groupProductSearch?.keyword?.length === 0) && (
              <div className={'product-info-basic__list-parent scroll-custom'}>
                {groupProductList?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       key={item.id}
                       data-type={groupProductList?.id === item.id
                       || !!item?.category_childs?.find(item => item.id === groupProductList?.id)
                       || focusParent === item.id}
                       onClick={e => {
                         groupProduct.onSelectParent(e, item)
                         setFocusParent(item.id)
                       }}
                  >
                    <TooltipV2 placement='top-center' title={item.category_name} baseOn="height"
                               className={'product-info-basic__list-parent--tooltip'}>
                      <Text>{item.category_name}</Text>
                    </TooltipV2>
                    {item?.category_childs?.length > 0 && (
                      <span style={{ marginRight: 8 }}>{PRODUCT_ICONS.arrow_left}</span>)}
                  </div>
                ))}
              </div>
            )}
            {(groupProductChild?.length > 0 && groupProductSearch?.keyword?.length === 0) && (
              <div className={'product-info-basic__list-child scroll-custom'}>
                {groupProductChild?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       onClick={_ => groupProduct.onSelectChild(item)}
                       key={item.id}
                       data-type={groupProduct?.id === item.id}
                  >
                    <TooltipV2 placement='top-center' title={item.category_name} baseOn="height"
                               className={'product-info-basic__list-parent--tooltip'}>
                      <Text>{item.category_name}</Text>
                    </TooltipV2>
                  </div>
                ))}
              </div>
            )}
            {groupProductSearch?.keyword?.length > 0 && (
              <div
                className={`product-info-basic__list-child--keyword scroll-custom ${groupProductSearch?.list?.length === 0 && 'product-info-basic__list-child--none'}`}>
                {groupProductSearch?.list?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       onClick={_ => groupProduct.onSelectSearchParent(item)}
                       key={item.id}
                       data-type={groupProductList?.id === item.id}
                  >
                    <TooltipV2 placement='top-center' baseOn="height"
                               className={'product-info-basic__list-parent--tooltip'}
                               title={item.display}>
                      {item.display}
                    </TooltipV2>
                  </div>
                ))}
              </div>
            )}
            {(groupProductSearch?.list?.length === 0 && groupProductSearch?.keyword?.length > 0) && (
              <>
                <div style={{ margin: '6rem 4rem 6rem 9rem' }}>
                  <img src="/img/empty-multiple-choice.png" alt="empty" width="80" height="80"
                       style={{ marginBottom: 16, objectFit: 'contain', objectPosition: 'center center' }}/>
                  <p style={{
                    color: 'rgb(0, 8, 29)',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    marginLeft: -48,
                    width: 'fit-content'
                  }}>
                    Không tìm thấy nhóm sản phẩm</p>
                </div>
              </>
            )}
          </div>
        </>
      </AlternativeAutoComplete>
    </StyledProductFilterGroupProductForm>
  )
}

export default GroupProduct

export const StyledProductFilterGroupProductForm = styled.div`
  max-width: 24.5rem;
  margin-right: 12px;
  .category-input__input .input__icon{
    position: absolute;
    right: 12px;
    bottom: 13px;
    width: 12px;
    height: 12px;
  
  }
  .product-info-basic {
    &__list-parent {
      width: 50%;
      height: 300px;
      overflow: auto;
      &--wrapper {
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 16px 0;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        
        & span:hover {
          color: #1A94FF !important;
        }
        &[data-type='true'] span{
          color: #1A94FF !important;
        }
      }
      &--tooltip {
        max-width: 100%;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 8px;
      }
    }
    &__list-child {
      padding-left: 20px;
      border-left: 1px solid #EBEEF5;
      width: 48%;
      height: 300px;
      overflow: auto;
      &--wrapper {
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 20px 0;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
      }
      &--tooltip {
        display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &--keyword {
        width: 100%;
        height: 300px;
        overflow: auto;
      }
      &--none {
        width: 0;
      }
    }
  }
`
