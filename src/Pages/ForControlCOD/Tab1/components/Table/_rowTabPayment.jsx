import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderRow from 'Pages/refactorOrder/hooks/useOrderRow'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useState} from 'react'
import styled from 'styled-components'
import { formatMoney } from '../../../../../util/functionUtil'
import {useTranslation} from "react-i18next";

export const RowTabPayment = ({data, ...props}) => {
  const { t } = useTranslation();
  return (
    <StyledRowTabPayment {...props}>
      <div style={{display: 'flex'}}>
        <div style={{marginRight: 86}}>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: 8}}
          >
            {t("paid")}:
          </Text>
          <Text
            color={THEME_SEMANTICS.delivered}
            fontSize={16}
            fontWeight={600}
            lineHeight={22}
          >
            {formatMoney(data?.total_payment)}
          </Text>
        </div>
        <div style={{marginRight: 86}}>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: 8}}
          >
            {t("still_have_to_pay")}:
          </Text>
          <Text
            color={THEME_SEMANTICS.failed}
            fontSize={16}
            fontWeight={600}
            lineHeight={22}
          >
            {
              formatMoney((Number(data?.total_amount || 0) - Number(data?.total_payment || 0)))
            }
          </Text>
        </div>
      </div>
      {Array.isArray(data?.delivery_payments) && data.delivery_payments.length > 0 && (
        <div style={{marginTop: 24}}>
          {data.delivery_payments.map(item => (
            <Collapser key={item.id} data={item} />
          ))}
        </div>
      )}
      <div style={{position: 'absolute', top: 0, right: 0}}>
        {Number(data?.total_amount || 0) - Number(data?.total_payment || 0) >
        0 ? (
          <Button size="sm">{t("confirm_to_pay")}</Button>
        ) : (
          <></>
        )}
      </div>
    </StyledRowTabPayment>
  )
}

const Collapser = ({data}) => {
  const {detail} = useOrderRow(data)
  const { t } = useTranslation();
  const [shouldCollapse, setShouldCollapse] = useState(false)

  return (
    <div className="row-tab-payment__list-item">
      <div
        className="row-tab-payment__list-item-toggle"
        data-active={shouldCollapse}
        onClick={() => setShouldCollapse(!shouldCollapse)}
      >
        <Text
          color={THEME_COLORS.secondary_100}
          fontSize={14}
          fontWeight={600}
          lineHeight={20}
        >
          {t("confirm_to_pay")}{' '}
          {formatMoney(data?.total_amount)}
          {' '}
          {t("success")}
        </Text>
        {ORDER_ICONS.chevronLeft}
      </div>
      <div
        className="row-tab-payment__list-item-content"
        data-active={shouldCollapse}
      >
        <div className="row-tab-payment__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {t("payment_amount")}:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {formatMoney(data?.total_amount)}
          </Text>
        </div>
        <div className="row-tab-payment__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {t("general_payment")}:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {data?.payment_method_name || '---'}
          </Text>
        </div>
        <div className="row-tab-payment__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {t("confirmation_staff")}:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {data?.fullname || '---'}
          </Text>
        </div>
        <div className="row-tab-payment__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {t("payment_time")}:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {data?.dt_created
              ? detail.tabs.payment.formatDateTime(data.dt_created)
              : '---'}
          </Text>
        </div>
      </div>
    </div>
  )
}

const StyledRowTabPayment = styled.div`
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
