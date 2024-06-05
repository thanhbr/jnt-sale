import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderRow from '../../hooks/useOrderRow'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useState} from 'react'
import styled from 'styled-components'
import {SubmitPaymentModal} from './_submitPaymentModal'
import {formatMoney} from 'util/functionUtil'

export const RowTabPayment = ({data, rowData, ...props}) => {
  const {row} = rowData

  const paid = Number(data?.total_payment || 0)
  const total = Number(data?.total_amount || 0)

  const haveToPay = total - paid

  const shouldShowSubmitPayment = data?.show_btn_payment

  return (
    <StyledRowTabPayment {...props}>
      <div style={{display: 'flex'}}>
        <div style={{marginRight: 86}}>
          <Text AS="B" fontSize={15} lineHeight={22} style={{marginRight: 8}}>
            Đã thanh toán:
          </Text>
          <Text
            as="b"
            color={THEME_SEMANTICS.delivered}
            fontSize={15}
            lineHeight={22}
          >
            {formatMoney(paid)}
          </Text>
        </div>
        <div style={{marginRight: 86}}>
          <Text as="b" fontSize={15} lineHeight={22} style={{marginRight: 8}}>
            Còn phải trả:
          </Text>
          <Text
            as="b"
            color={THEME_SEMANTICS.failed}
            fontSize={15}
            lineHeight={22}
          >
            {formatMoney(haveToPay)}
          </Text>
        </div>
      </div>
      {Array.isArray(data?.order_payments) && data.order_payments.length > 0 && (
        <div style={{marginTop: 24}}>
          {data.order_payments.map(item => (
            <Collapser key={item.id} data={item} />
          ))}
        </div>
      )}
      <div style={{position: 'absolute', top: 0, right: 0}}>
        {shouldShowSubmitPayment && (
          <>
            <Button size="sm" onClick={row.onOpenSubmitPaymentModal}>
              Xác nhận thanh toán
            </Button>
            {row.shouldOpenSubmitPaymentModal && (
              <SubmitPaymentModal
                data={data}
                onClose={row.onCloseSubmitPaymentModal}
              />
            )}
          </>
        )}
      </div>
    </StyledRowTabPayment>
  )
}

const Collapser = ({data}) => {
  const {detail} = useOrderRow(data)

  const [shouldCollapse, setShouldCollapse] = useState(false)

  return (
    <div className="row-tab-payment__list-item">
      <div
        className="row-tab-payment__list-item-toggle"
        data-active={shouldCollapse}
        onClick={() => setShouldCollapse(!shouldCollapse)}
      >
        <Text as="b">
          {data.status === '1' &&
            `Xác nhận thanh toán ${formatMoney(data?.total_amount)} thành công`}
          {data.status === '2' &&
            `Chờ thu hộ COD ${formatMoney(data?.total_amount)}`}
        </Text>
        {data.status === '1' && ORDER_ICONS.chevronLeft}
      </div>
      {data.status === '1' && (
        <div
          className="row-tab-payment__list-item-content"
          data-active={shouldCollapse}
        >
          <div className="row-tab-payment__list-item-figure">
            <Text color="#7C88A6" style={{display: 'block'}}>
              Số tiền thanh toán:
            </Text>
            <Text style={{display: 'block'}}>
              {formatMoney(data?.total_amount)}
            </Text>
          </div>
          <div className="row-tab-payment__list-item-figure">
            <Text color="#7C88A6" style={{display: 'block'}}>
              Phương thức thanh toán:
            </Text>
            <Text style={{display: 'block'}}>
              {data?.payment_method_name || '---'}
            </Text>
          </div>
          <div className="row-tab-payment__list-item-figure">
            <Text color="#7C88A6" style={{display: 'block'}}>
              Nhân viên xác nhận:
            </Text>
            <Text style={{display: 'block'}}>{data?.fullname || '---'}</Text>
          </div>
          <div className="row-tab-payment__list-item-figure">
            <Text color="#7C88A6" style={{display: 'block'}}>
              Thời gian thanh toán:
            </Text>
            <Text style={{display: 'block'}}>
              {data?.dt_created
                ? detail.tabs.payment.formatDateTime(data.dt_created)
                : '---'}
            </Text>
          </div>
        </div>
      )}
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
