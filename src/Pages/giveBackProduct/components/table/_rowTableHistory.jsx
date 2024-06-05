import React, {useState} from 'react';
import {Text} from "../../../../common/text";
import {formatMoney} from "../../../../util/functionUtil";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";
import useTableGiveBackProduct from "../../hooks/useTableGiveBackProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const RowTableHistory = ({data}) => {
  const {t} = useTranslation()
  const {functions, modalPayment} = useTableGiveBackProduct()
  return (
    <StyledRowTableHistory>
      {
        data && (
          <>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: 86 }}>
                <Text AS="B" fontSize={16} fontWeight={600} lineHeight={22} style={{ marginRight: 8 }}>
                  {t(DISPLAY_NAME_MENU.GENERAL.PAID)}:
                </Text>
                <Text
                  as="b"
                  color={THEME_SEMANTICS.delivered}
                  fontSize={16}
                  lineHeight={22}
                >
                  {formatMoney(data?.payment_money)}
                </Text>
              </div>
              <div style={{ marginRight: 86 }}>
                <Text as="b" fontSize={16} lineHeight={22} style={{ marginRight: 8 }}>
                  {t(DISPLAY_NAME_MENU.GENERAL.STILL_PAY)}:
                </Text>
                <Text
                  as="b"
                  color={THEME_SEMANTICS.failed}
                  fontSize={16}
                  lineHeight={22}
                >
                  {formatMoney(+data?.total_price - +data?.payment_money)}
                </Text>
              </div>
            </div>
            {Array.isArray(data?.payment_history) && data?.payment_history.length > 0 && (
              <div style={{ marginTop: 24 }}>
                {data?.payment_history?.slice(0).reverse()?.map(item =>
                  {
                    return <Collapser key={item.id} data={item}/>
                  }
                )}
              </div>
            )}
            {(+data?.status === 1 && +data?.payment_status === 1 || (+data?.total_price - +data?.payment_money === 0)) ? null : (
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <>
                  <Button size="sm"
                          style={{padding: '0 16px'}}
                          onClick={() => functions.handleSelectPayment(data)}
                  >
                    {t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND)}
                  </Button>
                </>
              </div>
            )}
          </>
        )
      }
    </StyledRowTableHistory>
  )
}
const Collapser = ({ data }) => {
  const {t} = useTranslation()
  const [shouldCollapse, setShouldCollapse] = useState(false)

  return (
    <div className="row-tab-payment__list-item">
      <div
        className="row-tab-payment__list-item-toggle"
        data-active={shouldCollapse}
        onClick={() => setShouldCollapse(!shouldCollapse)}
      >
        <Text as="b">
          {t(DISPLAY_NAME_MENU.GENERAL.PAYMENT_CONFIRM)} {formatMoney(data?.payment_money)} <Text style={{textTransform: "lowercase"}}>{t(DISPLAY_NAME_MENU.GENERAL.SUCCESS)}</Text>
        </Text>
        {GIVEBACK_PRODUCT_ICONS.chevronLeft}
      </div>
      <div
        className="row-tab-payment__list-item-content"
        data-active={shouldCollapse}
      >
        <div className="row-tab-payment__list-item-figure">
          <Text color="#7C88A6" style={{ display: 'block' }}>
            {t(DISPLAY_NAME_MENU.GENERAL.PAYMENT_AMOUNT)}:
          </Text>
          <Text style={{ display: 'block' }}>
            {formatMoney(data?.payment_money)}
          </Text>
        </div>
        <div className="row-tab-payment__list-item-figure">
          <Text color="#7C88A6" style={{ display: 'block' }}>
            {t(DISPLAY_NAME_MENU.GENERAL.PAYMENT_METHOD)}:
          </Text>
          <Text style={{ display: 'block' }}>
            {data?.payment_method_name || '---'}
          </Text>
        </div>
        <div className="row-tab-payment__list-item-figure">
          <Text color="#7C88A6" style={{ display: 'block' }}>
            {t(DISPLAY_NAME_MENU.GENERAL.CONFIRM_STAFF)}:
          </Text>
          <Text style={{ display: 'block' }}>{data?.user || '---'}</Text>
        </div>
        <div className="row-tab-payment__list-item-figure">
          <Text color="#7C88A6" style={{ display: 'block' }}>
            {t(DISPLAY_NAME_MENU.GENERAL.PAYMENT_TIME)}:
          </Text>
          <Text style={{ display: 'block' }}>{!!data?.create_date ? fDateTimeSuffix(data?.create_date) : ''}</Text>
        </div>
      </div>
    </div>
  )
}


export default RowTableHistory

const StyledRowTableHistory = styled.div`
  position: relative;

  .row-tab-payment {
    &__list-item {
      margin-bottom: 12px;
      padding: 12px 24px;

      border-left: 3px solid ${THEME_SEMANTICS.delivered};

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__list-item-toggle {
      display: flex;
      align-items: center;

      cursor: pointer;

      &[data-active='true'] {
        svg {
          transform: rotate(0deg);
        }
      }

      svg {
        margin-left: 8px;

        transform: rotate(180deg);
        transition: transform 0.6s;
      }
    }

    &__list-item-content {
      max-height: 0;

      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      transition: max-height 0.5s;

      &[data-active='true'] {
        max-height: 75vh;
      }
    }

    &__list-item-figure {
      width: 250px;
      margin-top: 8px;
    }
  }
`

