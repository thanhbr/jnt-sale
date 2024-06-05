import React, { useState } from 'react'
import styled from 'styled-components'
import { AlternativeAutoComplete } from './~alternativeAutoComplete'
import useImportFilterForm from '../../hooks/useImportFilterForm'
import { PRODUCT_ICONS } from '../../../../../../product/interfaces/~icon'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Text } from '../../../../../../../common/text'
import { useTranslation } from 'react-i18next'

const FilterGroupProduct = () => {
  const { productGroup } = useImportFilterForm()
  const { groupProduct, groupProductChild, groupProductSearch, active } = productGroup
  const [focusParent, setFocusParent] = useState('')
  const { t } = useTranslation()
  return (
    <StyledImportExportFilterGroupProductForm>
      <AlternativeAutoComplete
        className="import-group-product-filter-form"
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: { name: t('product_page_group_product'), value: '' }, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 130,
          placeholder: t('product_page_select_group_product'),
          readOnly: true,
          value: productGroup?.active?.value,
          onIconClick: () => productGroup.onSelectChild(null),
        }}
        // menu
        menuProps={{
          empty: groupProduct?.length <= 0 ? t('product_page_empty_group_product') : '',
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: t('product_page_find_group_product'),
          // value: province.keyword || '',
          onChange: productGroup.onGroupProductKeywordChange,
        }}
      >
        <>
          <div style={{ display: 'flex' }}>
            {(groupProduct?.length > 0 && groupProductSearch?.keyword?.length === 0) && (
              <div className={'product-info-basic__list-parent scroll-custom'}>
                {groupProduct?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       key={item.id}
                       data-type={groupProduct?.id === item.id
                       || !!item?.category_childs?.find(item => item.id === productGroup?.active?.id)
                       || focusParent === item.id}
                       onClick={e => {
                         productGroup.onSelectParent(e, item)
                         setFocusParent(item.id)
                       }}
                  >
                    <Tooltip placement='top-center' title={item.category_name} baseOn="height"
                             className={'product-info-basic__list-parent--tooltip'}>
                      <Text>{item.category_name}</Text>
                    </Tooltip>
                    {item?.category_childs?.length > 0 && (
                      <span style={{ marginRight: 8 }}>{PRODUCT_ICONS.arrow_left}</span>)}
                  </div>
                ))}
              </div>
            )}
            {(groupProductChild?.length > 0 && groupProductSearch?.keyword?.length === 0) && (
              <div className={`product-info-basic__list-child scroll-custom`}>
                {groupProductChild?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       onClick={_ => productGroup.onSelectChild(item)}
                       key={item.id}
                       data-type={active?.id === item.id}
                  >
                    <Tooltip placement='top-center' title={item.category_name} baseOn="height"
                             className={'product-info-basic__list-parent--tooltip'}>
                      <Text>{item.category_name}</Text>
                    </Tooltip>
                  </div>
                ))}
              </div>
            )}

            {groupProductSearch?.keyword?.length > 0 && (
              <div
                className={`product-info-basic__list-child--keyword scroll-custom ${groupProductSearch?.list?.length === 0 && 'product-info-basic__list-child--none'}`}>
                {groupProductSearch?.list?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       onClick={_ => productGroup.onSelectSearchParent(item)}
                       key={item.id}
                       data-type={groupProduct?.id === item.id}
                  >
                    <Tooltip placement='top-center' baseOn="height"
                             className={'product-info-basic__list-parent--tooltip'}
                             title={item.display}>
                      {item.display}
                    </Tooltip>
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
          {/*{loadMore && (*/}
          {/*  <StyledLoadMore>*/}
          {/*    <Spinner size={48} thickness={4} />*/}
          {/*  </StyledLoadMore>*/}
          {/*)}*/}
        </>
      </AlternativeAutoComplete>
    </StyledImportExportFilterGroupProductForm>
  )
}

export default FilterGroupProduct

export const StyledImportExportFilterGroupProductForm = styled.div`
  //max-width: 24.5rem;
  margin-bottom: 16px !important;
  //width: 100%;
    width: calc(25% - 4px);
    @media screen and (max-width: 1599px) {
        width: calc((100% / 3) - 12px);
      }
    .import-group-product-filter-form{
      width: 100%;
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
          color: rgb(229, 16, 29) !important;
        }
        &[data-type='true'] span{
          color: rgb(229, 16, 29) !important;
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
