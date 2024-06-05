import useCreateInfoProduct from "../../../hooks/useCreateInfoProduct";
import {PRODUCT_ICONS} from "../../../interfaces/~icon";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {Input} from "../../../../../common/form/input";
import {Popper} from "../../../../../common/popper";
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import {Textarea} from "../../../../../common/form/textarea";
import styled from "styled-components";
import React from "react";
import {Option} from "../../../../../common/form/select/_option";
import {ORDER_SINGLE_ICONS} from "../../../../orderSingle/interface/_icons";
import {Tooltip} from "../../../../../common/tooltipv2";
import CreateUnitManage from "./createUnitManage";
import ZoomIn from "../modal/zoomIn";
import {AlternativeAutoComplete} from "./~alternativeAutoComplete";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";
import {useTranslation} from "react-i18next";

const InfoProduct = () => {
  const { t } = useTranslation()
  const {value, functions, validate} = useCreateInfoProduct()
  const groupUnit = value?.formInfoProduct?.unit?.list

  return (
    <StyledInfoProduct>
      <div className={'product-info-product'}>
        <p className={'product-info-product__title'}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.IMAGE_PRODUCT)}</p>
        <div className={'product-info-product__img'}>
          {!!value?.formInfoProduct?.image?.link ? (
            <>
              <div className={'product-info-product__img--current'}
                   onClick={() => functions?.onZoomInImage(true, value?.formInfoProduct?.image?.link)}
              >
                <img src={value?.formInfoProduct?.image?.link}
                     alt={'product-image'}
                />
              </div>
              <span className={'product-info-product__img--remove'}
                    onClick={() => functions.removeProductImg()}
              >{PRODUCT_ICONS.closeCircle}</span>
            </>
          ) : (
            <>
              <div className={`product-info-product__img-placeholder ${validate?.formInfoProductValidate?.image?.status && 'product-info-product__img-placeholder--error'}`} >
                <input title=" " type='file'
                       accept="image/png, image/jpeg"
                       className={'product-info-product__img-src'}
                       onChange={e => functions.onUploadIMG(e)}
                />
                <span>{PRODUCT_ICONS.addImage}</span>
                <Text as={'p'} fontSize={13} style={{width: '117%'}}>{t(DISPLAY_NAME_MENU.GENERAL.ADD_IMAGE)}</Text>
              </div>
              {validate?.formInfoProductValidate?.image?.status && (
                <Text
                  style={{position: 'absolute', bottom: -20, color: 'red'}}
                >{validate?.formInfoProductValidate?.image?.message}</Text>
              )}
            </>
          )}
          <p className={'product-info-product__note-image'}>{t(DISPLAY_NAME_MENU.GENERAL.INFO_ADD_IMAGE)}<br />{t(DISPLAY_NAME_MENU.GENERAL.INFO_MAX_ADD_IMAGE)}</p>
        </div>

        <div className={'product-info-product__unit-and-weight'}>
          <div className={'product-info-product__unit-manage'}>
            <AlternativeAutoComplete
              inputProps={{
                categoryList: [], // menu list in category dropdown
                categoryValue: { name: '', value: '' }, // if not exist this value -> default category: categoryList[0]
                // categoryWidth: 140,
                categoryHidden: true,
                label: (
                  <>
                    {t(DISPLAY_NAME_MENU.GENERAL.UNIT)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                  </>
                ),
                placeholder: t(DISPLAY_NAME_MENU.GENERAL.SELECT_UNIT),
                readOnly: true,
                // disabled,
                value: value?.formInfoProduct?.unit?.value?.unit_name || '',

              }}
              menuProps={{
                empty: groupUnit?.length <= 0 ? t(DISPLAY_NAME_MENU.GENERAL.UNIT_NOT_FOUND) : '',
              }}
              searchInputProps={{
                placeholder: t(DISPLAY_NAME_MENU.GENERAL.FIND_UNIT),
                // value: '',
                onChange: val => functions?.handleSearchUnit(val),
              }}
              validateText={validate?.formInfoProductValidate?.unit?.message}
              validateType={validate?.formInfoProductValidate?.unit?.status ? 'danger' : 'success'}
              // className={disabled && 'product-group-content_alternative'}
            >
              {groupUnit?.length > 0 &&
                groupUnit?.map(item => {
                    return (
                      <Option
                        key={item.id}
                        className={"product-info-product__option-text"}
                        data-active={item.id === value?.formInfoProduct?.unit?.value?.id}
                        onClick={() => functions.onSelectTypeUnit(item)}
                        style={{paddingTop: 16, cursor: 'pointer'}}
                      >
                        <Tooltip className='tooltip_select' title={item.unit_name} baseOn='height' placement='top-center'>
                          <Text>{item.unit_name}</Text>
                        </Tooltip>
                      </Option>
                    )}
                  )}
              <CreateBox onClick={() => functions?.onToggleShowUnitManage(true)}/>
            </AlternativeAutoComplete>
          </div>
          <div className={'product-info-product__weight'}>
            <Input
              label={
                <div style={{marginLeft: 4}}>
                  {t(DISPLAY_NAME_MENU.GENERAL.WEIGHT)}
                </div>
              }
              value={value?.formInfoProduct?.weight}
              onChange={e => functions.onChangeWeight(e.target?.value)}
              // onBlur={_ => validate.onBlurWeight()}
              // validateText={validate?.formInfoProductValidate?.weight?.message}
              // validateType={validate?.formInfoProductValidate?.weight?.status ? 'danger' : 'success'}
              placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_WEIGHT)}
              icon={
                <Popper
                  renderPopper={({onClose}) => (
                    <div className="product-info-product__discount-type-dropdown-menu">
                      {
                        value?.listWeight?.map((item) => {
                          if(!item.active) return (
                            <div
                              className="product-info-product__discount-type-dropdown-menu-item"
                              style={{
                                color: THEME_COLORS.secondary_100,
                                padding: 8
                              }}
                              onClick={() => functions.onChangeTypeUnit(item, {onClose})}
                            >
                              <Text>{item.name}</Text>
                            </div>
                          )
                        })
                      }
                    </div>
                  )}
                  renderToggle={({open}) => (
                    <div className="product-info-product__weight-dropdown-toggle">
                      <Text as="b" color={THEME_COLORS.primary_300} style={{display: 'flex', width: 50}}>
                        {value?.formInfoProduct?.unit?.type}
                        <i data-active={open}>{PRODUCT_ICONS.dropdown}</i>
                      </Text>
                    </div>
                  )}
                  popperProps={{style: {padding: '4px 0'}}}
                />
              }
              onIconClick={() => console.log(20)}
              style={{width: '27.5rem', marginLeft: 4}}
              maxLength={5}
            />
          </div>
        </div>

        <div className={'product-info-product__click-more'}>
          {value?.formInfoProduct?.note?.open ? (
            <>
              <Textarea
                label={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_DESCRIPTION)}
                placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_DESCRIPTION)}
                style={{resize: 'none'}}
                className={'product-info-product__note-group'}
                value={value?.formInfoProduct?.note?.content}
                onChange={e => functions.onChangeNote(e.target.value)}
              ></Textarea>
              <Text style={{color: '#1A94FF'}}
                    onClick={() => functions.onShowNote()}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.COLLAPSE)} <span className={'product-info-product__click-more--collapse'}>{PRODUCT_ICONS.blue_dropdown}</span>
              </Text>
            </>
          ) : (
            <Text style={{color: '#1A94FF'}}
                  onClick={() => functions.onShowNote()}
            >
              {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_DESCRIPTION)} <span style={{marginLeft: 4}}>{PRODUCT_ICONS.blue_dropdown}</span>
            </Text>
          )}
        </div>
      </div>
      <CreateUnitManage />
      {value?.zoomInImage?.open && (
        <ZoomIn
          closeModal={() => functions.onZoomInImage(false, '')}
          linkActive={value?.zoomInImage?.linkActive}
        />
      )}
    </StyledInfoProduct>
  )
}

const CreateBox = ({...props}) => {
  const { t } = useTranslation()
  return (
    <StyledCreateBox {...props}>
      <div className="create-box__container">
        <i style={{margin: '4px 4px 0 0'}}>{ORDER_SINGLE_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>{t(DISPLAY_NAME_MENU.GENERAL.ADD_UNIT)}</Text>
      </div>
    </StyledCreateBox>
  )
}

export default InfoProduct;

export const StyledInfoProduct = styled.div`
  .tooltip_select {
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &:hover span {
      color: rgb(229, 16, 29) !important;
    }
  }
  .product-info-product {
    &__title {
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 16px;
    }
    &__img {
      display: flex;
      margin-bottom: 24px;
      position: relative;
      
      &--remove {
        position: absolute;
        left: 91px;
        top: -10px;
        cursor: pointer;
      }
      
      &-src {
        width: 104px;
        height: 104px;
        margin-left: -40px;
        margin-top: -26px;
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }
      
      &--current {
        width: 104px;
        height: 104px;
        text-align: center;
        background: white;
        border: 1px solid #cfdbe8;
        border-radius: 6px;
        img {
          border-radius: 6px;
          max-width: 102px;
          height: 102px;
        }
        &:hover {
          cursor: pointer;
          &::before {
            content: 'See photo';
            position: absolute;
            width: 104px;
            height: 104px;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 6px;
            
            color: white;
            text-align: center;
            padding-top: 42px;
            font-size: 14px;
            font-weight: 400;
            left: 0;
          }
        }
      }
    }
    &__img-placeholder {
      background: rgba(26, 148, 255, 0.05);
      width: 104px;
      height: 104px;
      padding: 28px 22px 26px 22px;
      text-align: center;
      border-radius: 6px;
      cursor: pointer;
      &--error {
        padding: 28px 20px 26px 20px;
        border: 1px dashed red;
      }
      
      p {
        margin-top: 10px;
        font-weight: 400;
        font-size: 14px;
      }
    }
    &__note-image {
      font-style: italic;
      font-weight: 400;
      font-size: 13px;
      color: #7C88A6;
      margin: auto 16px;
    }
    &__unit-and-weight {
      display: flex;
    }
    &__unit-manage {
      width: 27.5rem;
      margin-right: 8px;
      flex-basis: 50%;
    }
    &__weight {
      width: 27.5rem;
      position: relative;
      flex-basis: 50%;
      
      &--dropdown-icon {
        color: rgb(229, 16, 29) !important; 
        position: absolute;
        right: 4px;
        display: flex;
        bottom: 8px;
        cursor: pointer;
      }
      
      & .input__dropdown {
        width: 36px;
        padding: 12px;
        margin-left: 25.125rem;
        margin-top: -8px;
        cursor: pointer;
        font-size: 14px;
        overflow: hidden;
      }
      &--dropdown {
        position: absolute;
        right: 0;
        background: white;
        box-shadow: var(--box-shadow);
        padding: 10px 16px;
        border-radius: 4px;
        top: 60px;
      }
    }
    &__weight-title {
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 12px;
    }
    &__click-more {
      margin-top: 24px;
      cursor: pointer;
      &--collapse {
        margin-left: 2px;
        svg {
          transform: rotate(180deg);
        }
      }
    }
    &__option-text[data-active='true'] span{
      color: rgb(229, 16, 29) !important;
    }
    &__weight-dropdown-toggle {
      i[data-active='true'] {
        transform: rotate(180deg);
        transition: transform 0.25s;
      }
      i[data-active='false'] {
        transform: rotate(0);
        transition: transform 0.25s;
      }
    }
    &__note-group {
      height: 155px;
      margin-bottom: 40px;
      textarea {
        height: 155px;
      }
    }
  }
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
