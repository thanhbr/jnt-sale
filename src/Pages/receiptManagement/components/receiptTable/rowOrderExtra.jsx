import React from 'react';
import {RECEIPT_TABLE_ROW_EXTRA_TABS} from "../../interfaces/contant";
import styled from "styled-components";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Link} from "react-router-dom";
import {Button} from "../../../../common/button";
import {formatMoney} from "../../../../util/functionUtil";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {RECEIPT_ICONS} from "../../interfaces/icon";
import {Tooltip} from "../../../../common/tooltip";
import {LINK_OBJECT_NAME_RECEIPT} from "../../interfaces/config";

const RowOrderExtra = ({data, active, onPrint, onEditDesc, ...props}) => {
  return (
    <StyledRowReceiptExtra {...props} data-active={active}>
      <div className="row-receipt-extra__container">
        <div className="row-receipt-extra__tabs">
          {RECEIPT_TABLE_ROW_EXTRA_TABS.map(item => (
            <div
              key={item.id}
              className="row-receipt-extra__tab"
              data-active={true}
              // data-active={item.value === activeTab}
              // onClick={() => setActiveTab(item.value)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="receipt-extra__content">
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
              <div style={{display: 'flex'}}>
                <div style={{marginRight: 50}}>
                  <Text
                    color="#7C88A6"
                    fontSize={14}
                    fontWeight={400}
                    lineHeight={20}
                    style={{display: 'block'}}
                  >
                    Nhóm người nộp:
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
                    Tên người nộp:
                  </Text>
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
                    {!!data?.object_name && !!data?.object_phone || data?.object_type === 'partner_ship' ? (
                      <Link
                        to={`${LINK_OBJECT_NAME_RECEIPT(data?.object_type, data?.object_phone, data?.object_id || '')}`}
                        target="_blank"
                        className="row-tab-detail__link-hover"
                        style={{color: THEME_SEMANTICS.delivering, cursor: 'pointer'}}
                      >
                        {!!data?.object_name && !!data?.object_phone
                          ? data?.object_name?.length < 50 ? data?.object_name
                            : <Tooltip placement="bottom-start"
                                       title={data?.object_name}
                            >
                              {data?.object_name.substring(0, 50)+' ...'}
                            </Tooltip>
                          :  (data?.object_name ||'---')}
                      </Link>
                    ) : (data?.object_name?.length < 30
                        ? data?.object_name
                        : <Tooltip placement="bottom-start"
                                   title={data?.object_name}
                        >
                          {data?.object_name.substring(0, 30)+' ...'}
                        </Tooltip>) ||'---'}
                  </Text>
                  <Text
                    color="#7C88A6"
                    fontSize={14}
                    fontWeight={400}
                    lineHeight={20}
                    style={{display: 'block'}}
                  >
                    Loại phiếu thu:
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
                    Giá trị thu:
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
                    {(+data?.receipt_type_is_default === 1 && (!!data?.purchase_id || !!data?.order_id)) ? (
                      <Link
                        to={`${!!data?.purchase_id ? `/purchases?search=${data?.purchase_id}` : `/orders?search=${data?.order_id || ''}`}`}
                        target="_blank"
                        className="row-tab-detail__link-hover"
                        style={{color: '#1A94FF', cursor: 'pointer'}}
                      >
                        {data?.reference_code}
                      </Link>
                    ) : (data?.reference_code || '---')}
                  </Text>
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
                    style={{textTransform: 'capitalize'}}
                  >
                    {!!data?.description
                      ? data?.description?.length < 80 ? data?.description
                                                       : <Tooltip placement="bottom-start"
                                                                    title={data?.description}
                                                          >
                                                          {data?.description.substring(0, 80)+' ...'}
                                                        </Tooltip>
                      :  '---'}
                  </Text>
                  {+data?.status === 1 && (
                    <span style={{position: 'relative'}}>
                      <Text style={{cursor: 'pointer', position: 'absolute', top: 2, left: 4}}
                            onClick={onEditDesc}
                      > {RECEIPT_ICONS?.edit_description}</Text>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row-tab-detail__content--other">
              <div className="row-tab-detail__content--other-print">
                <Button size={'sm'} onClick={onPrint}>In phiếu thu</Button>
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

  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    max-height: 176vh;
    padding: 4px 0 7px 0;
  }
  &[data-active='false'] {
    max-height: 0;
  }

  .row-receipt-extra {
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
