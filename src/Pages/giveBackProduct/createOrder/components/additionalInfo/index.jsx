import React from 'react';
import useCreateGiveBackProduct from "../../../hooks/useCreateGiveBackProduct";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {Textarea} from "../../../../../common/form/textarea";
import styled from "styled-components";
import useGlobalContext from "../../../../../containerContext/storeContext";
import {GIVEBACK_PRODUCT_ICONS} from "../../../interfaces/icon";
import {Tooltip} from "../../../../../common/tooltip";
import {Text} from "../../../../../common/text";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const AdditionalInfo = () => {
  const {t} = useTranslation()
  const {formData, functions} = useCreateGiveBackProduct()
  const [state] = useGlobalContext()
  const orderReturnDetail = formData?.orderReturnDetail
  const fullNameAccount = state?.user?.fullname || '---'


  return (
    <StyledAdditionalInfo>
      <div className={'giveback-product-create-add-info'}>
        <p className={'giveback-product-create-add-info--title'}>{t(DISPLAY_NAME_MENU.CUSTOMER)}</p>
        {!!!orderReturnDetail?.customer_mobile ? <Text fontWeight={600}>{orderReturnDetail?.customer_name}</Text> : (
          <a href={`/partner-management/customer?keyword=${orderReturnDetail?.customer_mobile}&group=&city=&district=&ward=&per_page=20&start=0`}
             target={'blank'}
          >
            {orderReturnDetail?.customer_name} - {orderReturnDetail?.customer_mobile}
          </a>
        )}
      </div>
      <div className={'giveback-product-create-add-info'}>
        <p className={'giveback-product-create-add-info--title'}>{t(DISPLAY_NAME_MENU.GENERAL.ODER_ID)}</p>
        <a href={`/orders?search=${orderReturnDetail?.id}`}
           target={'blank'}
        >
          {orderReturnDetail?.id}
        </a>
      </div>
      <div className={'giveback-product-create-add-info'} >
        <AlternativeAutoComplete
          // main input
          inputProps={{
            categoryList: [], // menu list in category dropdown
            categoryValue: {name: 'Kho nhận hàng trả', value: ''}, // if not exist this value -> default category: categoryList[0]
            categoryWidth: 110,
            categoryHidden: true,
            label: (<div style={{display: 'flex'}}>
                      <Text>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.WAREHOUSE_RECEIVE_GOODS)}</Text>
                      <Tooltip
                        className="giveback-product-table-thead__tooltip"
                        placement="bottom"
                        title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.WAREHOUSE_GOODS_TOOLTIP)}
                        style={{display: 'flex', margin: '-1px 0 0 4px'}}
                      >
                        <span>{GIVEBACK_PRODUCT_ICONS.question}</span>
                      </Tooltip>
                    </div>),
            placeholder: 'Chọn kho nhận hàng trả',
            readOnly: true,
            disabled:true,
            value: orderReturnDetail?.warehouse_name || '',
          }}
        >
        </AlternativeAutoComplete>
      </div>
      <div className={'giveback-product-create-add-info'}>
        <AlternativeAutoComplete
          // main input
          inputProps={{
            categoryList: [], // menu list in category dropdown
            categoryValue: {name: 'Người tạo', value: ''}, // if not exist this value -> default category: categoryList[0]
            categoryWidth: 110,
            categoryHidden: true,
            label: t('{creator}'),
            placeholder: 'Chọn người tạo',
            readOnly: true,
            disabled:true,
            value: fullNameAccount,
          }}
        >
        </AlternativeAutoComplete>
      </div>
      <div className={'giveback-product-create-add-info'}>
        <Textarea
          label={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_REASON)}
          placeholder={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.ENTER_REFUND_REASON)}
          value={orderReturnDetail?.note || ''}
          style={{resize: 'none'}}
          onChange={e => functions?.handleChangeNote(e.target.value)}
          maxLength={255}
          validateText={orderReturnDetail?.note?.length === 255 ? t(DISPLAY_NAME_MENU.VALIDATE.MAX.REFUND_REASON) : ''}
          validateType={orderReturnDetail?.note?.length === 255 ? 'danger' : 'default'}
        />
      </div>
    </StyledAdditionalInfo>
  )
}

export default AdditionalInfo


export const StyledAdditionalInfo = styled.div`
  .giveback-product-create {
    &-add-info {
      margin-top: 22px;
      &--title {
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      }
      a {
        font-size: 14px;
        line-height: 140%;
        color: #1A94FF;
      }
    }
  }
`
