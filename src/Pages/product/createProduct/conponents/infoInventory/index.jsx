import useCreateInfoInventory from "../../../hooks/useCreateInfoInventory";
import {Grid} from "@mui/material";
import {Button} from "../../../../../common/button";
import {Switch} from "../../../../customer/components/switch";
import {Text} from "../../../../../common/text";
import {Input} from "../../../../../common/form/input";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import styled from "styled-components";
import React from "react";
import {Option} from "../../../../../common/form/select/_option";
import {Tooltip} from "../../../../../common/tooltipv2";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const InfoInventory = () => {
  const { t } = useTranslation()
  const {value, functions, validate} = useCreateInfoInventory()
  return (
    <StyledInfoInventory>
      <Grid container>
        {!value?.formInfoInventory?.statusInit ? (
          <>
            <Grid xs={9} sm={9} md={9} lg={9} item>
              <div style={{textAlign: 'left', marginTop: '-18px'}}>
                <p style={{color: '#7C88A6', marginBottom: '16px', fontSize: 15, fontWeight: 400}}>
                  {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SCRIPT_WAREHOUSE)}
                </p>
                <Button
                  size={'xs'}
                  onClick={() => functions.onChangeInitInventory()}
                >{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INIT_WAREHOUSE)}</Button>
              </div>
            </Grid>
            <Grid xs={3} sm={3} md={3} lg={3} item>
              <div style={{marginTop: '-54px', textAlign: 'end'}}>
                <img src={'/img/product/create-inventory.png'} alt={'placeholder-inventory'}/>
              </div>
            </Grid>
          </>
        ) : (
          <>
            <div className="product-info-inventory__toggle-item">
              <Switch
                checked={true}  style={{marginRight: 8}}
                onChange={() => functions.onChangeInitInventory()}
              />
              <Text color="#191D32">
                {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INIT_WAREHOUSE)}
              </Text>
            </div>
            <Grid xs={6} sm={6} md={6} lg={6} item style={{marginTop: -8}}>
              <div className="product-info-inventory__form-input--inventory">
                <AlternativeAutoComplete
                  inputProps={{
                    categoryList: [], // menu list in category dropdown
                    categoryValue: { name: '', value: '' }, // if not exist this value -> default category: categoryList[0]
                    // categoryWidth: 140,
                    categoryHidden: true,
                    label: (
                      <>
                        {t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                      </>
                    ),
                    placeholder: t(DISPLAY_NAME_MENU.GENERAL.SELECT_WAREHOUSE),
                    readOnly: true,
                    // disabled,
                    value: value?.formInfoInventory?.warehouse?.value?.warehouse_name || '',

                  }}
                  menuProps={{
                    empty: value?.groupWarehouse?.length <= 0 ? t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE_NOT_FOUND) : '',
                  }}
                  searchInputProps={{
                    placeholder: t(DISPLAY_NAME_MENU.GENERAL.FIND_WAREHOUSE),
                    // value: '',
                    onChange: val => functions?.handleSearchWarehouse(val),
                  }}
                  // className={disabled && 'product-group-content_alternative'}
                >
                  {value?.groupWarehouse?.length > 0 &&
                  value?.groupWarehouse?.map(item => {
                    return (
                      <Option
                        key={item.id}
                        className={"product-info-product__option-text"}
                        data-active={item.id === value?.formInfoInventory?.warehouse?.value?.id}
                        onClick={() => functions.onSelectWarehouse(item)}
                        style={{paddingTop: 16, cursor: 'pointer'}}
                      >
                        <Tooltip className='tooltip_select' title={item.warehouse_name} baseOn='height' placement='top-center'>
                          <Text>{item.warehouse_name}</Text>
                        </Tooltip>
                      </Option>
                    )}
                  )}
                </AlternativeAutoComplete>
              </div>
            </Grid>
            <Grid xs={6} sm={6} md={6} lg={6} item style={{marginTop: -8}}>
              <div className={'product-info-inventory__form-input--supplier'}>
                <Input
                  label={
                    <>
                      {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INITIAL_INVENTORY)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                    </>
                  }
                  value={value?.formInfoInventory?.init}
                  onChange={e => functions.onChangeInitValue(e.target?.value)}
                  onBlur={_ => validate.onBlurInitValue()}
                  validateText={validate?.formInfoInventoryValidate?.init?.message}
                  validateType={validate?.formInfoInventoryValidate?.init?.status ? 'danger' : 'success'}
                  placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_INITIAL_INVENTORY)}
                  maxLength={7}
                />
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </StyledInfoInventory>
  );
};

export default InfoInventory;


export const StyledInfoInventory = styled.div`
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
  .product-info-inventory {
    &__toggle-item {
      display: flex;
      position: absolute;
      top: 28px;
      right: 24px;
    }
    &__form-input {
      &--inventory {
        margin-right: 8px;
        
        & .select__option.product-info-product__option-text[data-active='true'] span {
          color: rgb(229, 16, 29) !important;
        }
      }
      &--supplier {
        margin-left: 8px;
      }
    }
  }
`