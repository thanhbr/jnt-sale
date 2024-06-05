import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Tooltip} from 'common/tooltip'
import {transformDateApiToReportFormat} from 'Pages/orderSingle/utils/transform'
import {StyledOrderSingleReportCustomerModal} from './_styled'

export const OrderSingleReportCustomerModal = ({data, onClose, ...props}) => {
  console.log(data)
  return (
    <Modal
      actions={[
        <Button
          appearance="ghost"
          size="sm"
          style={{minWidth: 110}}
          onClick={onClose}
        >
          Đóng
        </Button>,
      ]}
      title="Lịch sử báo xấu khách hàng"
      width={600}
      onClose={onClose}
    >
      <StyledOrderSingleReportCustomerModal {...props}>
        <div className="order-single-report-customer-modal__table">
          <div className="order-single-report-customer-modal__thead">
            <div className="order-single-report-customer-modal__tr">
              <div className="order-single-report-customer-modal__th">
                Shop cảnh báo
              </div>
              <div className="order-single-report-customer-modal__th">
                Ngày báo cáo
              </div>
              <div className="order-single-report-customer-modal__th">
                Nội dung cảnh báo
              </div>
            </div>
          </div>
          <div className="order-single-report-customer-modal__tbody">
            {data.map(item => (
              <div
                key={item?.shop_id}
                className="order-single-report-customer-modal__tr"
              >
                <div className="order-single-report-customer-modal__td">
                  {item?.shop || '---'}
                </div>
                <div className="order-single-report-customer-modal__td">
                  {transformDateApiToReportFormat(item?.dt_created)}
                </div>
                <div className="order-single-report-customer-modal__td">
                  <Tooltip placement="left" title={item?.content}>
                    <div className="--ellipsis" style={{textAlign: 'right'}}>
                      {item?.content}
                    </div>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StyledOrderSingleReportCustomerModal>
    </Modal>
  )
}
