import React from 'react';
import {RightSightPopup} from "../../../../../layouts/rightSightPopup";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {SwitchStatus} from "../../../../../Component/SwitchStatus/SwitchStatus";
import {ConfirmModal} from "../../../../../layouts/rightSightPopup/confirm";
import useCreateInfoProduct from "../../../hooks/useCreateInfoProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const CreateUnitManage = () => {
  const { t } = useTranslation()
  const {value, functions, validate} = useCreateInfoProduct()
  return (
    <>
      <RightSightPopup
        openModal={value?.formInfoProduct?.modal?.open}
        confirmBeforeClose={true}
        clickClose={() => functions?.onToggleShowUnitManage(false)}
        acceptance={() => functions.submitUnitManage()}
        disableSubmit={functions?.canSubmitUnitManage}
        animationClose={functions?.animationClose}
        header={{
          title: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.TITLE_UNIT_MODAL),
          subTitle: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SUBTITLE_UNIT_MODAL)
        }}
        body={[
          {
            item: (
              <>
                <div className={'product-group-content'}>
                  <div  style={{marginTop: 24}}>
                    <Input
                      label={
                        <>
                          {t(DISPLAY_NAME_MENU.GENERAL.UNIT)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                      }
                      maxLength={100}
                      autoComplete={'false'}
                      placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_UNIT_NAME)}
                      value={value?.modalUnitManage?.form?.unit}
                      onChange={e => functions.onChangeModalUnit(e.target.value)}
                      onBlur={_ => validate.onBlurModalUnit()}
                      validateText={value?.modalUnitManage?.validate?.unit?.message}
                      validateType={!value?.modalUnitManage?.validate?.unit?.status ? 'success' : 'danger'}
                    />
                  </div>
                  <div style={{marginTop: 24}}>
                    <Input
                      label={
                        <>
                          {t(DISPLAY_NAME_MENU.GENERAL.UNIT_SYMBOL)} <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                      }
                      autoComplete={'false'}
                      maxLength={255}
                      placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_UNIT_SYMBOL)}
                      value={value?.modalUnitManage?.form?.symbol}
                      onChange={e => functions.onChangeModalSymbol(e.target.value)}
                      onBlur={_ => validate.onBlurModalSymbol()}
                      validateText={value?.modalUnitManage?.validate?.symbol?.message}
                      validateType={!value?.modalUnitManage?.validate?.symbol?.status ? 'success' : 'danger'}
                    />
                  </div>

                  <div style={{display: 'flex', marginTop: 32}}>
                    <SwitchStatus status={true} disabled={true}/>
                    <Text as='p' style={{marginLeft: 8}}>{t(DISPLAY_NAME_MENU.GENERAL.ACTIVE_OR_INACTIVE)}</Text>
                  </div>
                </div>
              </>
            )
          }
        ]}
        footer={
          {
            cancel: {
              width: 74,
              title: t(DISPLAY_NAME_MENU.GENERAL.CLOSE)
            },
            save: {
              width: 110,
              title: t(DISPLAY_NAME_MENU.GENERAL.SAVE)
            },
          }
        }
      />
      <ConfirmModal
        openModal={value?.modalUnitManageConfirm}
        closeModal={() => functions.closeModalUnitManageConfirm()}
        acceptance={() => functions.acceptanceModalUnitManageConfirm()}
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
  )
}

export default CreateUnitManage;
