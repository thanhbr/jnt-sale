import {Button} from 'common/button'
import { formatDatetime } from 'common/form/datePicker/_functions'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useState} from 'react'
import styled from 'styled-components'
import {formatMoney} from '../../../../util/functionUtil'
import { PopupPayment } from '../popupPayment'
import useRow from 'Pages/purchases/hooks/useRow'
import purchasesFilterForm from 'Pages/purchases/hooks/useFilter'

export const RowTabPayment = ({data, ...props}) => {
  const [openPopup, setOpenPopup] = useState(false)
  const {row} = useRow(data)
  const {functions} = purchasesFilterForm()
  const totalPayment = !!data?.total_payment ? +data?.total_payment : 0
  const totalReturn = !!data?.totalReturn ? +data?.totalReturn : 0 
  const mustPay = +data.total_amount + totalReturn - totalPayment

  const paymentList = data.purchase_payment.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  })

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
            Đã thanh toán:
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
            Còn phải trả:
          </Text>
          <Text
            color={THEME_SEMANTICS.failed}
            fontSize={16}
            fontWeight={600}
            lineHeight={22}
          >
            {formatMoney(mustPay)}
          </Text>
        </div>
      </div>
      {Array.isArray(paymentList) &&
        paymentList?.length > 0 && (
          <div style={{marginTop: 24}}>
            {paymentList.map(item => (
              <Collapser key={item.id} data={item} />
            ))}
          </div>
        )}
      <div style={{position: 'absolute', top: 0, right: 0}}>
        {mustPay >
        0 ? (
          <Button size="sm" onClick={() => setOpenPopup(true)}>Xác nhận thanh toán</Button>
        ) : (
          <></>
        )}
      </div>
      {openPopup && (
        <PopupPayment
          onClose={() => setOpenPopup(false)}
          data={data}
          mustPay={mustPay}
          refreshData={() => {
            row?.refreshOrderDetails()
            functions.fetchUpdateData()
          }}
        />
      )}
    </StyledRowTabPayment>
  )
}

const Collapser = ({data}) => {
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
          Xác nhận thanh toán {formatMoney(data?.amount)} thành công
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
            Số tiền thanh toán:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {formatMoney(data?.amount)}
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
            Phương thức thanh toán:
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
            Nhân viên xác nhận:
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
            Thời gian thanh toán:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {formatDatetime(data?.date) || '---'}
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
