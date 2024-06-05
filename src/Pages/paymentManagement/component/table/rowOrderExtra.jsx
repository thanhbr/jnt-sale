import React from 'react';
import styled from "styled-components";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Link} from "react-router-dom";
import {Button} from "../../../../common/button";
import {formatMoney} from "../../../../util/functionUtil";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {PAYMENT_MANAGEMENT_ICONS} from "../../interfaces/icon";
import {Tooltip} from "../../../../common/tooltip";
import {Tooltip as TooltipV2} from "../../../../common/tooltipv2";
import {LINK_OBJECT_NAME_RECEIPT, LINK_REFERENCE_CODE} from "../../interfaces/config";
import {PAYMENT_MANAGEMENT__TABLE_ROW_EXTRA_TABS} from "../../interfaces/_const";

const RowOrderExtra = ({data, active, onPrint, onEditDesc, ...props}) => {
    return (
        <StyledRowReceiptExtra {...props} data-active={active}>
            <div className="row-payment-management-extra__container">
                <div className="row-payment-management-extra__tabs">
                    {PAYMENT_MANAGEMENT__TABLE_ROW_EXTRA_TABS.map(item => (
                        <div
                            key={item.id}
                            className="row-payment-management-extra__tab"
                            data-active={true}
                            // data-active={item.value === activeTab}
                            // onClick={() => setActiveTab(item.value)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <div className="payment-management-extra__content">
                    <div className="row-tab-detail__content">
                        <div className="row-tab-detail__content--general">
                            <Text
                                as="h4"
                                color={THEME_COLORS.secondary_100}
                                fontSize={16}
                                lineHeight={22}
                                style={{marginBottom: 12}}
                            >
                                Thông tin chung
                            </Text>
                            <div style={{display: 'flex',width:'100%'}}>
                                <div style={{marginRight: 50,width:'98%'}}>
                                    <Text
                                        color="#7C88A6"
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{display: 'block'}}
                                    >
                                        Nhóm người nhận:
                                    </Text>
                                    <Text
                                        color={THEME_COLORS.secondary_100}
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {data?.object_type_name || '---'}
                                    </Text>
                                    <Text
                                        color="#7C88A6"
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{display: 'block', marginTop: 12}}
                                    >
                                        Tên người nhận:
                                    </Text>
                                    <TooltipV2 baseOn={'height'} className={'tooltip-v2-name'} title={data?.object_name}>
                                        <Text
                                            fontSize={14}
                                            fontWeight={400}
                                            lineHeight={20}
                                            style={{
                                                marginBottom: 12,
                                                display: 'block',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {!!data?.object_name ?
                                                data?.object_type === 'other' ?
                                                    (
                                                        <Text
                                                            className="row-tab-detail__link-hover"
                                                        >
                                                            {data?.object_name}
                                                        </Text>
                                                    )
                                                    :(
                                                        <Link
                                                            to={`${LINK_OBJECT_NAME_RECEIPT(data?.object_type, data?.object_phone || '',data?.object_id)}`}
                                                            target="_blank"
                                                            className="row-tab-detail__link-hover"
                                                            style={{color: THEME_SEMANTICS.delivering, cursor: 'pointer'}}
                                                        >
                                                            {data?.object_name}
                                                        </Link>
                                                    ) : '---'}
                                        </Text>
                                    </TooltipV2>

                                    <Text
                                        color="#7C88A6"
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{display: 'block'}}
                                    >
                                        Loại phiếu chi:
                                    </Text>
                                    <Text
                                        color={THEME_COLORS.secondary_100}
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {data?.receipt_type_name || '---'}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className="row-tab-detail__content--payment">
                            <Text
                                as="h4"
                                color={THEME_COLORS.secondary_100}
                                fontSize={16}
                                lineHeight={22}
                                style={{marginBottom: 12}}
                            >
                                Thông tin thanh toán
                            </Text>
                            <div style={{display: 'flex'}}>
                                <div style={{marginRight: 50}}>
                                    <Text
                                        color="#7C88A6"
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{display: 'block'}}
                                    >
                                        Giá trị chi:
                                    </Text>
                                    <Text
                                        color={THEME_COLORS.secondary_100}
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {formatMoney( data?.amount || 0)}
                                    </Text>
                                    <Text
                                        color="#7C88A6"
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{display: 'block', marginTop: 12}}
                                    >
                                        Phương thức thanh toán:
                                    </Text>
                                    <Text
                                        color={THEME_COLORS.secondary_100}
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {data?.payment_method_name || '---'}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className="row-tab-detail__content--advance">
                            <Text
                                as="h4"
                                color={THEME_COLORS.secondary_100}
                                fontSize={16}
                                lineHeight={22}
                                style={{marginBottom: 12}}
                            >
                                Thông tin bổ sung
                            </Text>
                            <div style={{display: 'flex'}}>
                                <div style={{marginRight: 50}}>
                                    <Text
                                        color="#7C88A6"
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{display: 'block'}}
                                    >
                                        Mã chứng từ tham chiếu:
                                    </Text>
                                    <TooltipV2  baseOn={'height'} className={'tooltip-v2-name'} title={data?.receipt_type_is_default}>
                                        <Text
                                            fontSize={14}
                                            fontWeight={400}
                                            lineHeight={20}
                                            style={{
                                                marginBottom: 12,
                                                display: 'block',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {+data?.receipt_type_is_default === 1  && (!!data?.purchase_id || !!data?.order_id || !!data?.order_refund_code) ? (
                                                <Link
                                                    to={`${LINK_REFERENCE_CODE(data?.object_type,data?.reference_code,data?.order_refund_code)}`}
                                                    target="_blank"
                                                    className="row-tab-detail__link-hover"
                                                    style={{color: '#1A94FF', cursor: 'pointer'}}
                                                >
                                                    {data?.object_type === 'customer' ? data?.order_refund_code : data?.reference_code}
                                                </Link>
                                            ) : '---'}
                                        </Text>
                                    </TooltipV2>
                                    <Text
                                        color="#7C88A6"
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{display: 'block'}}
                                    >
                                        Cửa hàng:
                                    </Text>
                                    <Text
                                        color={THEME_COLORS.secondary_100}
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {data?.shopname || '---'}
                                    </Text>
                                    <Text
                                        color="#7C88A6"
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                        style={{display: 'block', marginTop: 12}}
                                    >
                                        Mô tả:
                                    </Text>
                                    <Text
                                        color={THEME_COLORS.secondary_100}
                                        fontSize={14}
                                        fontWeight={400}
                                        lineHeight={20}
                                    >
                                        {!!data?.description
                                            ? data?.description?.length < 65 ? data?.description
                                                : <Tooltip placement="bottom-start"
                                                           title={data?.description}
                                                >
                                                    {data?.description.substring(0, 65)+' ...'}
                                                </Tooltip>
                                            :  '---'}
                                    </Text>
                                    {+data?.status === 1 && (
                                        <span style={{position: 'relative'}}>
                      <Text style={{cursor: 'pointer', position: 'absolute', top: 2, left: 4}}
                            onClick={onEditDesc}
                      > {PAYMENT_MANAGEMENT_ICONS?.edit_description}</Text>
                    </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row-tab-detail__content--other">
                            <div className="row-tab-detail__content--other-print">
                                <Button size={'sm'} onClick={onPrint}>In phiếu chi</Button>
                            </div>
                            <Text
                                color="#7C88A6"
                                fontSize={14}
                                fontWeight={400}
                                lineHeight={20}
                                style={{display: 'block'}}
                            >
                                Người tạo:
                            </Text>
                            <Text
                                color={THEME_COLORS.secondary_100}
                                fontSize={14}
                                fontWeight={400}
                                lineHeight={20}
                                style={{textTransform: 'capitalize'}}
                            >
                                {data?.fullname || '---'}
                            </Text>
                            <Text
                                color="#7C88A6"
                                fontSize={14}
                                fontWeight={400}
                                lineHeight={20}
                                style={{display: 'block', marginTop: 12}}
                            >
                                Ngày ghi sổ:
                            </Text>
                            <Text
                                color={THEME_COLORS.secondary_100}
                                fontSize={14}
                                fontWeight={400}
                                lineHeight={20}
                                style={{textTransform: 'capitalize'}}
                            >
                                {!!data?.dt_record ? fDateTimeSuffix(data?.dt_record) : '---'}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </StyledRowReceiptExtra>
    )
}

export default RowOrderExtra

const StyledRowReceiptExtra = styled.div`
  // max-height: 0;
  .tooltip-v2-name{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    max-height: 176vh;
    padding: 4px 0 7px 0;
  }
  &[data-active='false'] {
    max-height: 0;
  }

  .row-payment-management-extra {
    &__container {
      overflow: hidden;

      border-left: 4px solid #1e9a98;
      border-radius: 0 8px 8px 8px;
    }

    &__tabs {
      height: 36px;

      display: flex;
    }

    &__tab {
      margin-right: 4px;
      padding: 0 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #e2eaf8;
      border-radius: 8px 8px 0 0;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: all 0.25s;

      cursor: pointer;

      &:first-child {
        border-radius: 0 8px 0 0;
      }

      &[data-active='true'] {
        background: #fff;
      }
    }

    &__content {
      padding: 24px 36px 32px 36px;

      background: #fff;
      border-radius: 0 8px 0 0;
    }
  }
  .row-tab-detail {
    &__content {
      padding: 24px 36px;
      background: white;
      display: flex;
      &--general {
        width: 25%;
      }
      &--payment {
        width: 25%;
      }
      &--advance {
        width: 25%;
      }
      &--other {
        width: 25%;
        &-print {
          display: flex;
          justify-content: end;
          & button {
            width: 105px;
            padding: 0;
          }
        }
      }
    }
  }
`
