import React, {useState} from 'react';
import {AlternativeAutoComplete} from "../../createProduct/conponents/infoBasic/~alternativeAutoComplete";
import useCreateInfoBasic from "../../hooks/useCreateInfoBasic";
import {Tooltip as Tooltipv2} from "../../../../common/tooltipv2";
import {Text} from "../../../../common/text";
import {PRODUCT_ICONS} from "../../interfaces/~icon";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const FilterGroupProduct = () => {
  const { t } = useTranslation()
  const {value, functions} = useCreateInfoBasic()
  const groupProduct = value?.formInfoBasic?.groupProduct?.list
  const groupProductChild = value?.formInfoBasic?.groupProduct?.listChildTwo
  const groupProductSearch = value?.formInfoBasic?.groupProduct?.search
  const [focusParent, setFocusParent] = useState('')

  return (
    <StyledProductFilterGroupProductForm>
      <AlternativeAutoComplete
        className="order-filter-form__input-wide"
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: {name: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.GROUP_PRODUCT), value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 140,
          placeholder: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SELECT_GROUP_PRODUCT),
          readOnly: true,
          value: value?.formInfoBasic?.groupProduct?.value,
          // onIconClick: () => functions.onSelectChild(null),
        }}
        // menu
        menuProps={{
          empty: groupProduct?.length <= 0 ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EMPTY_GROUP_PRODUCT) : '',
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.FIND_GROUP_PRODUCT),
          // value: province.keyword || '',
          onChange: functions.onGroupProductKeywordChange,
        }}
      >
        <>
          <div style={{display: 'flex'}}>
            {(groupProduct?.length > 0 && groupProductSearch?.keyword?.length === 0) && (
              <div className={'product-info-basic__list-parent scroll-custom'}>
                {groupProduct?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       key={item.id}
                       data-type={value?.formInfoBasic?.groupProduct?.id === item.id
                       || !!item?.category_childs?.find(item => item.id === value?.formInfoBasic?.groupProduct?.id)
                       || focusParent === item.id}
                       onClick={e => {
                         functions.onSelectParent(e, item)
                         setFocusParent(item.id)
                       }}
                  >
                    <Tooltipv2 placement='top-center' title={item.category_name} baseOn="height" className={'product-info-basic__list-parent--tooltip'}>
                      <Text>{item.category_name}</Text>
                    </Tooltipv2>
                    {item?.category_childs?.length > 0 && (<span style={{marginRight: 8}}>{PRODUCT_ICONS.arrow_left}</span>)}
                  </div>
                ))}
              </div>
            )}
            {(groupProductChild?.length > 0 && groupProductSearch?.keyword?.length === 0)  && (
              <div className={'product-info-basic__list-child scroll-custom'}>
                {groupProductChild?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       onClick={_ => functions.onSelectChild(item)}
                       key={item.id}
                       data-type={value?.formInfoBasic?.groupProduct?.id === item.id}
                  >
                    <Tooltipv2 placement='top-center' title={item.category_name} baseOn="height" className={'product-info-basic__list-parent--tooltip'}>
                      <Text>{item.category_name}</Text>
                    </Tooltipv2>
                  </div>
                ))}
              </div>
            )}
            {groupProductSearch?.keyword?.length > 0 && (
              <div className={`product-info-basic__list-child--keyword scroll-custom ${groupProductSearch?.list?.length === 0 && 'product-info-basic__list-child--none'}`}>
                {groupProductSearch?.list?.map(item => (
                  <div className={'product-info-basic__list-parent--wrapper'}
                       onClick={_ => functions.onSelectSearchParent(item)}
                       key={item.id}
                       data-type={value?.formInfoBasic?.groupProduct?.id === item.id}
                  >
                    <Tooltipv2 placement='top-center' baseOn="height" className={'product-info-basic__list-parent--tooltip'}
                               title={item.display}>
                      {item.display}
                    </Tooltipv2>
                  </div>
                ))}
              </div>
            )}
            {(groupProductSearch?.list?.length === 0 &&  groupProductSearch?.keyword?.length > 0) && (
              <>
                <div style={{margin: '6rem 4rem 6rem 9rem'}}>
                  <img src="/img/empty-multiple-choice.png" alt="empty" width="80" height="80"
                       style={{marginBottom: 16, objectFit: 'contain', objectPosition: 'center center'}} />
                  <p style={{color: "rgb(0, 8, 29)", fontSize: 13, fontStyle: 'normal', fontWeight: 400, marginLeft: -48, width: "fit-content"}}>
                    {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EMPTY_GROUP_PRODUCT)}</p>
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
    </StyledProductFilterGroupProductForm>
  );
};

export default FilterGroupProduct;


export const StyledProductFilterGroupProductForm = styled.div`
  max-width: 24.5rem;
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
    }
    
    &__list-child {
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
