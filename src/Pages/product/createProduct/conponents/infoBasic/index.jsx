import useCreateInfoBasic from "../../../hooks/useCreateInfoBasic";
import {Switch} from "../../../../customer/components/switch";
import {Text} from "../../../../../common/text";
import {Grid} from "@mui/material";
import {Input} from "../../../../../common/form/input";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {Tooltip} from "../../../../../common/tooltip";
import {Tooltip as Tooltipv2} from "../../../../../common/tooltipv2";
import {PRODUCT_ICONS} from "../../../interfaces/~icon";
import {AlternativeAutoComplete} from "./~alternativeAutoComplete";
import styled from "styled-components";
import React from "react";
import CreateGroupProduct from "./createGroupProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const InfoBasic = () => {
  const { t } = useTranslation()
  const {value, functions, validate} = useCreateInfoBasic()
  const groupProduct = value?.formInfoBasic?.groupProduct?.list
  const groupProductChild = value?.formInfoBasic?.groupProduct?.listChildTwo
  const groupProductSearch = value?.formInfoBasic?.groupProduct?.search

  return (
    <StyledInfoBasic>
      {value?.formCreate?.statusForm === 'create' && (
        <div className="product-info-basic__toggle-list">
          <div className="product-info-basic__toggle-item" style={{display: 'flex'}}>
            <Switch
              checked={value?.formInfoBasic?.active}  style={{marginRight: 8}}
              onChange={() => functions.onChangeStatus()}
            />
            <Text color="#191D32">
              {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ACTIVE_OR_DEACTIVATION)}
            </Text>
          </div>
        </div>
      )}
      <Grid container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <div className="product-info-basic__form-input">
            <Input
              label={
                <>
                  {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_NAME)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                </>
              }
              value={value?.formInfoBasic?.name}
              onChange={e => functions.onChangeName(e.target?.value)}
              onBlur={_ => validate.onBlurName()}
              validateText={validate?.formInfoBasicValidate?.name?.message}
              validateType={validate?.formInfoBasicValidate?.name?.status ? 'danger' : ''}
              placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_PRODUCT_NAME)}
              maxLength={255}
            />
          </div>
        </Grid>
        {(value?.formCreate?.statusForm !== 'editMultipleVersion') ?
          (
            <>
              <Grid xs={6} sm={6} md={6} lg={6} item>
                <div className="product-info-basic__form-input-1 product-info-basic__form-input-code">
                  <Input
                    label={
                      <>
                        {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_CODE)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                        <Tooltip
                          title={
                            <div style={{fontSize: 13, padding: '1px 4px'}}>
                              {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.TOOLTIP_PRODUCT_CODE)}
                            </div>}
                          placement={'bottom-start'}
                        >
                          <i
                            style={{
                              marginLeft: 4,
                              display: 'inline-block',
                              transform: 'translateY(4px)',
                              cursor: 'pointer',
                              position: 'absolute',
                              top: '-6px'
                            }}
                            onClick={e => e.stopPropagation()}
                          >
                            {PRODUCT_ICONS.question}
                          </i>
                        </Tooltip>
                      </>
                    }
                    value={value?.formInfoBasic?.code}
                    onChange={e => functions.onChangeCode(e.target?.value)}
                    onBlur={() => validate.onBlurCode()}
                    validateText={validate?.formInfoBasicValidate?.code?.message}
                    validateType={validate?.formInfoBasicValidate?.code?.status ? 'danger' : 'success'}
                    placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_PRODUCT_CODE)}
                    maxLength={50}
                  />
                </div>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} item>
                <div className="product-info-basic__form-input-1 product-info-basic__form-input-barcode">
                  <Input
                    label={
                      <>
                        {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_BARCODE)}
                        <Tooltip
                          title={
                            <div style={{fontSize: 13, padding: '1px 2px'}}>
                              {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.TOOLTIP_PRODUCT_BARCODE)}
                            </div>}
                          placement={'bottom-start'}
                        >
                          <i
                            style={{
                              marginLeft: 4,
                              display: 'inline-block',
                              transform: 'translateY(4px)',
                              cursor: 'pointer',
                              position: 'absolute',
                              top: '-6px'
                            }}
                            onClick={e => e.stopPropagation()}
                          >
                            {PRODUCT_ICONS.question}
                          </i>
                        </Tooltip>
                      </>
                    }
                    value={value?.formInfoBasic?.barCode}
                    onChange={e => functions.onChangeBarCode(e.target?.value)}
                    onBlur={() => validate.onBlurBarCode()}
                    validateText={validate?.formInfoBasicValidate?.barCode?.message}
                    validateType={validate?.formInfoBasicValidate?.barCode?.status ? 'danger' : 'success'}
                    placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_PRODUCT_BARCODE)}
                    maxLength={14}
                    icon={value?.formCreate?.statusForm === 'editSingleVersion'
                          ? (<Tooltip placement="bottom" title={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRINT_BARCODE)}>
                                <i> {PRODUCT_ICONS?.printSingleProduct} </i>
                              </Tooltip>) : ''}
                    onIconClick={() => functions?.onPrintBarcode()}
                  />
                </div>
              </Grid>
            </>
          ): null}
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <div className="product-info-basic__form-input-1">
            <AlternativeAutoComplete
              // main input
              inputProps={{
                categoryList: [], // menu list in category dropdown
                categoryHidden: true,
                readOnly: true,
                categoryValue: {name: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.GROUP_PRODUCT), value: ''},
                label:<>
                  <div>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.GROUP_PRODUCT)} <Text color={THEME_SEMANTICS.failed}>*</Text></div>
                </>,
                placeholder: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SELECT_GROUP_PRODUCT),
                value: value?.formInfoBasic?.groupProduct?.value,
              }}
              // search input in dropdown menu
              menuProps={{
                empty: groupProduct?.length <= 0 ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EMPTY_GROUP_PRODUCT) : '',
              }}
              // search input in dropdown menu
              searchInputProps={{
                placeholder: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.FIND_GROUP_PRODUCT),
                // value: province.keyword || '',
                onChange: functions.onGroupProductKeywordChange,
              }}
              validateText={validate?.formInfoBasicValidate?.group?.message}
              validateType={validate?.formInfoBasicValidate?.group?.status ? 'danger' : 'success'}
            >
              {/*{loading ? (*/}
              {/*  <StyledLoading>*/}
              {/*    <Spinner size={54} thickness={5} />*/}
              {/*    <Text style={{marginTop: 5}}>Loading...</Text>*/}
              {/*  </StyledLoading>*/}
              {/*) : (*/}
              <>
                <div style={{display: 'flex'}}>
                  {(groupProduct?.length > 0 && groupProductSearch?.keyword?.length === 0) && (
                    <div className={'product-info-basic__list-parent scroll-custom'}>
                      {groupProduct?.map(item => (
                        <div className={'product-info-basic__list-parent--wrapper'}
                             onClick={e => functions.onSelectParent(e, item)}
                             key={item.id}
                             data-type={value?.formInfoBasic?.groupProduct?.id === item.id}
                        >
                          <Tooltipv2 placement='top-center' title={item.category_name} baseOn="height" className={'product-info-basic__list-parent--tooltip'}>
                            {(groupProductChild?.length > 0
                              && groupProductSearch?.keyword?.length === 0
                              && !!groupProductChild?.find(child => child?.parent_id === item?.id)) ? (
                              <Text style={{color: '#1E9A98', width: '100%'}}>{item.category_name}</Text>
                            ) : (<Text style={{width: '100%'}}>{item.category_name}</Text>) }

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
                             data-type={value?.formInfoBasic?.groupProduct?.id === item.id}
                        >
                          <Tooltipv2 placement='top-center' title={item.category_name} baseOn="height" className={'product-info-basic__list-parent--tooltip'}>
                            <Text style={{width: '100%'}}>{item.category_name}</Text>
                          </Tooltipv2>
                        </div>
                      ))}
                    </div>
                  )}
                  {groupProductSearch?.keyword?.length > 0 && (
                    <div>
                      {groupProductSearch?.list?.map(item => (
                        <div className={'product-info-basic__list-parent--wrapper'}
                             onClick={_ => functions.onSelectSearchParent(item)}
                             key={item.id}
                             data-type={value?.formInfoBasic?.groupProduct?.id === item.id}
                        >
                          <Tooltipv2 placement='top-center' baseOn="height" className={'product-info-basic__list-parent--tooltip'}
                                     title={item.display}>
                            <Text style={{width: '100%'}}>{item.display}</Text>
                          </Tooltipv2>
                        </div>
                      ))}
                    </div>
                  )}
                  {(groupProductSearch?.list?.length === 0 &&  groupProductSearch?.keyword?.length > 0) && (
                    <>
                      <div style={{margin: '2rem auto'}}>
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
              {/*)}*/}
            </AlternativeAutoComplete>

            <div className={'product-info-basic__form-input-group-product--add'}
                 onClick={() => functions.onToggleShowGroupProduct(true)} >
              <div>{PRODUCT_ICONS.plusCircle} </div>
              <span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ADD_GROUP_PRODUCT)}</span>
            </div>
          </div>
        </Grid>
      </Grid>
      {value?.modalGroupProduct?.open ? (<CreateGroupProduct />) : null}
    </StyledInfoBasic>
  );
};

export default InfoBasic;


export const StyledInfoBasic = styled.div`
  .product-info-basic {
    //&__list-parent--tooltip {
    //  display: -webkit-box;
    //  height: 100%;
    //  -webkit-line-clamp: 1;
    //  -webkit-box-orient: vertical;
    //  overflow: hidden;
    //  text-overflow: ellipsis;
    //}
    &__toggle-item {
      position: absolute;
      top: 27px;
      right: 24px;
    }
    &__form-input-1 {
      margin-top: 24px;
    }
    &__form-input-code {
      margin-right: 8px;
    }
    &__form-input-barcode {
      margin-left: 8px;
    }
    &__form-input-group-product {
      position: relative;
      &--add {
        position: absolute;
        bottom: 72px;
        right: 24px;
        font-size: 14px;
        z-index: 2;
        
        svg {
          margin-left: 4px;
        }
        
        div {
          position: absolute;
          left: -24px;
          top: -2px;
          cursor: pointer;
        }
        span {
          color: #1A94FF;
          cursor: pointer;
        }
      }
    }
    
    &__list-parent {
      width: 50%;
      height: 260px;
      overflow: auto;
      &--wrapper {
        //height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 8px 0;
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
      border-left: 1px solid #EBEEF5;
      padding-left: 20px;
      width: 48%;
      height: 260px;
      overflow: auto;
      &--wrapper {
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 16px 0;
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
  }
`
