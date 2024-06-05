import useCreateInfoPrice from "../../../hooks/useCreateInfoPrice";
import {Grid} from "@mui/material";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {Tooltip} from "../../../../../common/tooltip";
import {PRODUCT_ICONS} from "../../../interfaces/~icon";
import React from "react";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const InfoPrice = () => {
  const { t } = useTranslation()
  const {value, functions, validate} = useCreateInfoPrice()

  return (
    <>
      <Grid container>
        <Grid xs={6} sm={6} md={6} lg={6} item>
          <div className="product-info-price__form-input">
            <Input
              label={
                <>{t(DISPLAY_NAME_MENU.GENERAL.RETAIL_PRICE)} <Text color={THEME_SEMANTICS.failed}>*</Text></>
              }
              value={value?.formInfoPrice?.retail}
              onChange={e => functions.onChangeRetail(e.target?.value)}
              onBlur={_ => validate.onBlurRetail()}
              validateText={validate?.formInfoPriceValidate?.retail?.message}
              validateType={validate?.formInfoPriceValidate?.retail?.status ? 'danger' : 'success'}
              placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_RETAIL_PRICE)}
              maxLength={11}
              icon={
                <Text as="u"
                      style={{color: '#7C88A6', position: 'absolute', right: 0}}>
                  ₫
                </Text>
              }
              style={{marginRight: 4}}
            />
          </div>
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item>
          <div className="product-info-price__form-input">
            <Input
              label={
                <div style={{marginLeft: 4}}>
                  {t(DISPLAY_NAME_MENU.GENERAL.WHOLESALE_PRICE)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                </div>
              }
              value={value?.formInfoPrice?.wholesale}
              onChange={e => functions.onChangeWholesale(e.target?.value)}
              onBlur={_ => validate.onBlurWholesale()}
              validateText={validate?.formInfoPriceValidate?.wholesale?.message}
              validateType={validate?.formInfoPriceValidate?.wholesale?.status ? 'danger' : 'success'}
              placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_WHOLESALE_PRICE)}
              maxLength={11}
              icon={
                <Text as="u"
                      style={{color: '#7C88A6', position: 'absolute', right: -8}}>
                  ₫
                </Text>
              }
              style={{marginLeft: 4}}
            />
          </div>
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item>
          <div className="product-info-price__form-input" style={{marginTop: 24}}>
            <Input
              label={
                <>
                  {t(DISPLAY_NAME_MENU.GENERAL.LAST_ENTRY_PRICE)} {value?.formCreate?.statusForm !== 'editSingleVersion' && (<Text color={THEME_SEMANTICS.failed}>*</Text>)}
                  <Tooltip
                    title={<div style={{fontSize: 13}}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SCRIPT_LAST_ENTRY_PRICE)}</div>}
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
              value={value?.formInfoPrice?.lastEntry}
              onChange={e => functions.onChangeLastEntry(e.target?.value)}
              onBlur={_ => validate.onBlurLastEntry()}
              validateText={validate?.formInfoPriceValidate?.lastEntry?.message}
              validateType={validate?.formInfoPriceValidate?.lastEntry?.status ? 'danger' : 'success'}
              placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_LAST_ENTRY_PRICE)}
              disabled={value?.formCreate?.statusForm === 'editSingleVersion'}
              maxLength={11}
              icon={
                <Text as="u"
                      style={{color: '#7C88A6', position: 'absolute', right: 0}}>
                  ₫
                </Text>
              }
              style={{marginRight: 4}}
            />
          </div>
        </Grid>
        {(value?.formInfoInventory?.statusInit || value?.formCreate?.statusForm === 'editSingleVersion') && (
          <Grid xs={6} sm={6} md={6} lg={6} item style={{marginTop: 24}}>
            <div className="product-info-price__form-input">
              <Input
                label={
                  <div style={{marginLeft: 4}}>
                    {t(DISPLAY_NAME_MENU.GENERAL.COST_PRICE)} {value?.formCreate?.statusForm !== 'editSingleVersion' && (<Text color={THEME_SEMANTICS.failed}>*</Text>)}
                    <Tooltip
                      title={<div style={{fontSize: 13, margin: '2px 5px 1px 5px'}}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SCRIPT_COST_PRICE)} <br/>
                        <span style={{color: '#1A94FF', cursor: 'pointer'}}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.CALCULATION_COST_PRICE)}</span></div>}
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
                  </div>
                }
                value={value?.formInfoPrice?.cost}
                onChange={e => functions.onChangeCost(e.target?.value)}
                onBlur={_ => validate.onBlurCost()}
                validateText={validate?.formInfoPriceValidate?.cost?.message}
                validateType={validate?.formInfoPriceValidate?.cost?.status ? 'danger' : 'success'}
                placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_COST_PRICE)}
                disabled={value?.formCreate?.statusForm === 'editSingleVersion'}
                maxLength={11}
                icon={
                  <Text as="u"
                        style={{color: '#7C88A6', position: 'absolute', right: -8}}>
                    ₫
                  </Text>
                }
                style={{marginLeft: 4}}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default InfoPrice;