import React from 'react';
import {RightSightPopup} from "../../../../../layouts/rightSightPopup";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {Tooltip} from "../../../../../common/tooltipv2";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {AutoCompleteSingleOption} from "../../../../../Component/surveyLogin/templates/autocompleteSingleOption";
import {Textarea} from "../../../../../common/form/textarea";
import {SwitchStatus} from "../../../../../Component/SwitchStatus/SwitchStatus";
import useCreateInfoBasic from "../../../hooks/useCreateInfoBasic";
import styled from "styled-components";
import {ConfirmModal} from "../../../../../layouts/rightSightPopup/confirm";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const CreateGroupProduct = () => {
  const { t } = useTranslation()
  const {value, functions, validate} = useCreateInfoBasic()
  return (
    <>
      <RightSightPopup
        openModal={value?.modalGroupProduct?.open}
        confirmBeforeClose={true}
        clickClose={() => functions?.onToggleShowGroupProduct(false)}
        acceptance={() => functions.submitGroupProduct()}
        disableSubmit={functions.canSubmitGroupProduct}
        animationClose={functions?.animationClose}
        header={{
            title: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.TITLE_GROUP_PRODUCT),
            subTitle: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SUBTITLE_GROUP_PRODUCT)
        }}
          body={[
          {
            item: (
              <StyledModalGroupProduct>
                <div className={'product-group-content'}>
                  <div  style={{marginTop: 24}}>
                    <Input
                      label={
                        <>
                          {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.CODE_GROUP_PRODUCT)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                      }
                      maxLength={80}
                      autoComplete={'false'}
                      placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_CODE_GROUP_PRODUCT)}
                      value={value?.modalGroupProduct?.form?.code}
                      onChange={e => functions.onChangeModalCode(e.target.value)}
                      onBlur={_ => validate.onBlurModalCode()}
                      validateText={value?.modalGroupProduct?.validate?.code?.message}
                      validateType={!value?.modalGroupProduct?.validate?.code?.status ? 'success' : 'danger'}
                    />
                  </div>
                  <div style={{marginTop: 24}}>
                    <Input
                      label={
                        <>
                          {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.NAME_GROUP_PRODUCT)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                      }
                      autoComplete={'false'}
                      maxLength={80}
                      placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_NAME_GROUP_PRODUCT)}
                      value={value?.modalGroupProduct?.form?.name}
                      onChange={e => functions.onChangeModalName(e.target.value)}
                      onBlur={_ => validate.onBlurModalName()}
                      validateText={value?.modalGroupProduct?.validate?.name?.message}
                      validateType={!value?.modalGroupProduct?.validate?.name?.status ? 'success' : 'danger'}
                    />
                  </div>
                  <div style={{marginTop: 24}}>
                    <AlternativeAutoComplete
                      inputProps={{
                        categoryList: [], // menu list in category dropdown
                        categoryValue: { name: '', value: '' }, // if not exist this value -> default category: categoryList[0]
                        // categoryWidth: 140,
                        categoryHidden: true,
                        label: (
                          <>
                            {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PARENT_GROUP_PRODUCT)}
                          </>
                        ),
                        placeholder: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SELECT_PARENT_GROUP_PRODUCT),
                        readOnly: true,
                        // disabled,
                        value: value?.modalGroupProduct?.form?.group?.category_name || '',

                      }}
                      menuProps={{
                        empty: value?.modalGroupParent?.list?.length <= 0 ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EMPTY_GROUP_PRODUCT) : '',
                      }}
                      searchInputProps={{
                        placeholder: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.FIND_GROUP_PRODUCT),
                        // value: pageState.keyword || '',
                        onChange: val => functions.onSearchModalGroupProduct(val),
                      }}
                      // className={disabled && 'product-group-content_alternative'}
                    >
                      {value?.modalGroupParent?.list?.length > 0 && (
                        value?.modalGroupParent?.list.map(item => {
                          return (
                            <AutoCompleteSingleOption
                              key={item.id}
                              data-active={item.id === value?.modalGroupProduct?.form?.group?.id}
                              onClick={_ => functions.onSelectChildGroupProduct(item)}
                              className={'product-group-content_alternative-option'}
                            >
                              <Tooltip className='tooltip_select' title={item.category_name} baseOn='height' placement='top-center'>
                                {item.category_name}
                              </Tooltip>
                            </AutoCompleteSingleOption>
                          )}
                      ))}
                    </AlternativeAutoComplete>
                  </div>
                  <div style={{marginTop: 24}}>
                    <Textarea
                      label={
                        <>
                          {t(DISPLAY_NAME_MENU.GENERAL.NOTE)}
                        </>
                      }
                      placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_NOTE)}
                      style={{resize: 'none'}}
                      value={value?.modalGroupProduct?.form?.note}
                      onChange={e => functions.onChangeModalNote(e.target.value)}
                      maxLength={256}
                      // validateText={pageState.valid.filde_note.status ? pageState.valid.filde_note.message : null}
                      // validateType={!pageState.valid.filde_note.status ? 'success' : 'danger'}
                    />
                  </div>

                  <div style={{display: 'flex', marginTop: 32}}>
                    <SwitchStatus status={true} disabled={true}/>
                    <Text as='p' style={{marginLeft: 8}}>{t(DISPLAY_NAME_MENU.GENERAL.ACTIVE_OR_INACTIVE)}</Text>
                  </div>
                </div>
              </StyledModalGroupProduct>
            )
          }
        ]}
          footer={
          {
            cancel: {
              width: 74,
              title: t(DISPLAY_NAME_MENU.GENERAL.CANCEL)
            },
            save: {
              width: 110,
              title: t(DISPLAY_NAME_MENU.GENERAL.SAVE)
            },
          }
        }
      />
      <ConfirmModal
        openModal={value?.modalGroupParentConfirm}
        closeModal={() => functions.closeModalGroupProductConfirm()}
        acceptance={() => functions.acceptanceModalGroupProductConfirm()}
        stylePopup={'payment-confirm_modal'}
        body={(
          <>
            <Text as={'P'} fontSize={20} fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM_LEAVING)}</Text>
            <Text as={'P'} style={{marginTop: 24}}>{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM_LEAVING_CONTENT)}</Text>
          </>
        )}
        footer={
          {
            cancel: {
              width: 74,
              title: t(DISPLAY_NAME_MENU.GENERAL.CLOSE)
            },
            acceptance: {
              width: 110,
              title: t(DISPLAY_NAME_MENU.GENERAL.CONFIRM)
            },
          }
        }
      />
    </>
  );
};

export default CreateGroupProduct;


export const StyledModalGroupProduct = styled.div`
  .tooltip_select {
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
