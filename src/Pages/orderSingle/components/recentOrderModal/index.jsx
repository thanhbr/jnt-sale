import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {transformDateApiToOrderFormat} from 'Pages/orderSingle/utils/transform'
import {ORDER_TABLE_CELL_SHIPPING_STATUSES} from 'Pages/refactorOrder/interfaces/_constants'
import {formatMoney} from 'util/functionUtil'
import {StyledOrderSingleRecentOrderModal} from './_styled'

export const OrderSingleRecentOrderModal = ({data, onClose, ...props}) => {
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
      closeIcon={true}
      title="Danh sách đơn hàng gần đây"
      width={808}
      onClose={onClose}
    >
      <StyledOrderSingleRecentOrderModal {...props}>
        <div className="order-single-recent-order-modal__table">
          <div className="order-single-recent-order-modal__thead">
            <div className="order-single-recent-order-modal__tr">
              <div className="order-single-recent-order-modal__th">
                Mã đơn hàng
              </div>
              <div className="order-single-recent-order-modal__th">
                Mã vận đơn
              </div>
              <div className="order-single-recent-order-modal__th">
                Giá trị đơn hàng
              </div>
              <div className="order-single-recent-order-modal__th">
                Trạng thái đơn hàng
              </div>
            </div>
          </div>
          <div className="order-single-recent-order-modal__tbody">
            {data.map(item => (
              <div
                key={item?.id}
                className="order-single-recent-order-modal__tr"
              >
                <div className="order-single-recent-order-modal__td">
                  <div>
                    <Text
                      as={item?.id ? 'a' : 'span'}
                      href={item?.id ? `/orders?search=${item.id}` : undefined}
                      target={item?.id ? '_blank' : undefined}
                      color={item?.id ? THEME_SEMANTICS.delivering : undefined}
                      style={{display: 'block'}}
                    >
                      {item?.id || '---'}
                    </Text>
                    <Text>
                      {transformDateApiToOrderFormat(item?.dt_created)}
                    </Text>
                  </div>
                </div>
                <div className="order-single-recent-order-modal__td">
                  <Text
                    as={item?.billcode ? 'a' : 'span'}
                    href={
                      item?.billcode
                        ? `/delivery/management?search=${item.billcode}`
                        : undefined
                    }
                    target={item?.billcode ? '_blank' : undefined}
                    color={
                      item?.billcode ? THEME_SEMANTICS.delivering : undefined
                    }
                  >
                    {item?.billcode || '---'}
                  </Text>
                </div>
                <div className="order-single-recent-order-modal__td">
                  {item?.total_amount ? formatMoney(item.total_amount) : '---'}
                </div>
                <div className="order-single-recent-order-modal__td">
                  <div
                    className="order-single-recent-order-modal__status"
                    style={{
                      background:
                        ORDER_TABLE_CELL_SHIPPING_STATUSES[
                          `_${item?.shipping_status_id || 1}`
                        ].background,
                      color:
                        ORDER_TABLE_CELL_SHIPPING_STATUSES[
                          `_${item?.shipping_status_id || 1}`
                        ].color,
                    }}
                  >
                    {item?.shipping_status_name || '---'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StyledOrderSingleRecentOrderModal>
    </Modal>
  )
}
