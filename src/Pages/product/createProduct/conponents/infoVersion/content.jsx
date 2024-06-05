import {Text} from "../../../../../common/text";
import {Grid} from "@mui/material";
import {Input} from "../../../../../common/form/input";
import {PRODUCT_ICONS} from "../../../interfaces/~icon";
import React from "react";
import {TagInput} from "./~tagInput";
import styled from "styled-components";
import useCreateInfoVersion from "../../../hooks/useCreateInfoVersion";
import TableInventory from "./tableInventory";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const InfoVersionPage = () => {
  const { t } = useTranslation()
  const {value, functions} = useCreateInfoVersion()
  return (
    <StyledInfoVersionPage>
      <Text className="product-info-version-page__sub-title">{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.MAX_ATTRIBUTE)}</Text>
      {value?.listAttr?.map((item, index) => {
        return (<Grid container className="product-info-version-page__wrapper" key={item.id}>
                  <Grid xs={3} sm={3} md={3} lg={3} item>
                    <div className="product-info-version-page__form-input">
                      <Input
                        label={
                          <>
                            {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.NAME_ATTRIBUTE)}
                          </>
                        }
                        value={item.name}
                        onChange={e => functions.onChangeAttrVersion(e.target?.value, item)}
                        validateText={!!!item?.name ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.ATTR_NAME) :
                                    (item?.name?.length >= 30) ? t(DISPLAY_NAME_MENU.VALIDATE.MAX.ATTR_NAME) : ''}
                        validateType={(!!item?.name || item?.name?.length < 30) ? 'danger' : 'success'}
                        placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_ATTR_NAME)}
                        className="product-info-version-page__form-input-attr"
                        maxLength={30}
                      />
                    </div>
                  </Grid>
                  <Grid xs={9} sm={9} md={9} lg={9} item>
                    <div className="product-info-version-page__form-input-tag">
                      <div>
                        <Text>{t(DISPLAY_NAME_MENU.GENERAL.VALUE)}</Text>
                        <TagInput
                          defaultValue={value?.formCreate?.version?.attrVersion[index]?.value || ''}
                          onChange={val => functions.onAddVersionProduct(val, item)}
                          placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.TYPE_AND_ENTER_ADD_VALUE)}
                          length={9}
                          className={'product-info-version-page__tag-input'}
                          validate={!!!value?.formCreate?.version?.attrVersion?.find(it => it.code === item?.code) && t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EMPTY_ATTRIBUTE)}
                        />
                        {!!!value?.formCreate?.version?.attrVersion?.find(it => it.code === item?.code)
                        && <Text className={'product-info-version-page__form-input-tag--error'}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EMPTY_ATTRIBUTE)}</Text>}
                      </div>
                      {!!!value?.formCreate?.version?.attrVersion[index]?.value?.find(it => it.status === 'edit') ? (
                        <span onClick={() => functions?.onRemoveAttr(item)}
                        style={{cursor: 'pointer'}}
                        >{PRODUCT_ICONS.trash}</span>
                      ) : null}

                    </div>
                  </Grid>
                </Grid>
            )
      })}
      {value?.listAttr?.length < 3 && (
        <Text className={'product-info-version-page__add-attr'}
              onClick={() => functions.onAddAttr()}
        >
          <span className={"product-info-version-page__add-attr--button"}>{PRODUCT_ICONS.bluePlus}</span>
          <span style={{marginLeft: 24}}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ADD_VERSION)}</span>
        </Text>
      )}
      {value.attrVersion.length > 0 && <TableInventory />}
    </StyledInfoVersionPage>
  );
};

export default InfoVersionPage;


export const StyledInfoVersionPage = styled.div`
  .product-info-version-page {
    &__sub-title {
      color: #7C88A6 !important;
      position: absolute;
      top: 48px;
      font-size: 15px !important;
    }
    &__wrapper {
      margin: 13px 0 16px 0;
    }
    &__form-input-tag {
      margin-left: 20px;
      display: flex;
      .tag-input__button .button__container span {
        max-width: 34.375rem;
        overflow: hidden;
      }
      &--error {
        color: rgb(255, 66, 78) !important;
        font-size: 12px !important;
      }
    }
    &__form-input-attr {
      width: 13.75rem;
    }
    &__tag-input {
      width: 38.8125rem;
      min-height: 34px;
      padding: 3.5px 16px 0 16px;
      margin: 8px 8px 0 0;
    }
    &__add-attr{
      cursor: pointer;
      &--button {
        position: relative;
        svg {
          position: absolute;
          margin: 0;
        }
      }
      span {
        color: #1A94FF;
      }
    } 
  }
`
