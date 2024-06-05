import {Popper} from 'common/popper'
import {Tooltip} from 'common/tooltip'
import useOrderSingleCustomerInfo from 'Pages/orderSingle/hooks/useOrderSingleCustomerInfo'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useState} from 'react'
import styled from 'styled-components'
import {OrderSingleCustomerInfoOrderInfoMenu as OrderInfoMenu} from '../../orderInfoMenu'
import {OrderSingleRecentOrderModal as RecentOrderModal} from '../../recentOrderModal'
import {OrderSingleReportCustomerModal as ReportCustomerModal} from '../../reportCustomerModal'

export const OrderSingleCustomerInfoActions = ({...props}) => {
  const {data} = useOrderSingleCustomerInfo()
  const {detail, order, report} = data.phone

  const figureListData = order.figures.map(item => ({
    ...item,
    name: item?.name ? `${item.name}:` : '',
    tooltip:
      item?.name === 'Đơn đã xác nhận'
        ? 'Toàn bộ đơn hàng của Khách hàng  ngoại trừ các đơn hàng ở trạng thái: Đơn Nháp, Hủy Đơn hàng, Chuyển hoàn, Chuyển hoàn thành công.'
        : '',
    value: item?.total || 0,
  }))

  const [shouldOpenReportCustomerModal, setShouldOpenReportCustomerModal] =
    useState(false)
  const [shouldOpenRecentOrderModal, setShouldOpenRecentOrderModal] =
    useState(false)

  return (
    <StyledOrderSingleCustomerInfoActions {...props}>
      {report.length > 0 && (
        <div className="order-single-customer-info-actions__action-icon">
          <Tooltip title={`Đã báo xấu: ${report.length} lần`}>
            <i onClick={() => setShouldOpenReportCustomerModal(true)}>
              {ORDER_SINGLE_ICONS.alertTriangle}
            </i>
          </Tooltip>
          {shouldOpenReportCustomerModal && (
            <ReportCustomerModal
              data={report}
              onClose={() => setShouldOpenReportCustomerModal(false)}
            />
          )}
        </div>
      )}
      {!!detail && (
        <div className="order-single-customer-info-actions__action-icon">
          <Popper
            disabled={order.loading || order.recentList.length <= 0}
            placement="bottom-end"
            renderPopper={({onClose}) => (
              <OrderInfoMenu
                extraData={[
                  ...figureListData,
                  {
                    name: 'Xem đơn hàng gần đây',
                    containerTooltip:
                      order.recentList.length <= 0
                        ? 'Bạn chưa có đơn hàng nào.'
                        : '',
                    onClick: () => {
                      if (order.recentList.length <= 0) return
                      if (onClose) onClose()
                      setShouldOpenRecentOrderModal(true)
                    },
                  },
                ]}
                onClose={onClose}
              />
            )}
          >
            <Tooltip
              placement="bottom-end"
              title={
                !order.loading
                  ? order.recentList.length <= 0
                    ? 'Chưa có lịch sử mua hàng'
                    : 'Thống kê đơn hàng'
                  : ''
              }
            >
              <i data-loading={order.loading}>
                {ORDER_SINGLE_ICONS.clipboardText}
              </i>
            </Tooltip>
          </Popper>
          {shouldOpenRecentOrderModal && (
            <RecentOrderModal
              data={order.recentList}
              onClose={() => setShouldOpenRecentOrderModal(false)}
            />
          )}
        </div>
      )}
    </StyledOrderSingleCustomerInfoActions>
  )
}

const StyledOrderSingleCustomerInfoActions = styled.div`
  display: flex;

  i {
    cursor: pointer;

    &[data-loading='true'] {
      cursor: progress;
    }
  }

  .order-single-customer-info-actions {
    &__action-icon {
      margin-left: 12px;
    }
  }
`
