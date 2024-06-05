import {useTranslation} from 'react-i18next'
import {getByDisplayValue} from '@testing-library/dom'
import ButtonGroup from '../../Component/ButtonGroup/buttonGroup'
import {
  getLogoShipperPartner,
  getRequestGood,
  getInsurance,
  getPaymentSide,
  displayNumber,
} from '../../util/functionUtil'
import TrackingStatus from 'Component/TrackingStatus/trackingStatus'

const infoLine = (item = {}) => (
  <div className="info-line-wrapper">
    <div className="info-line-label upos-text upos-text-color-main ">
      {item.label || '--'}
    </div>
    <div className="info-line-value upos-text upos-text-indygo-dye upos-text-roboto-medium-500">
      {item.value || '--'}
    </div>
  </div>
)
function ShipperDetail({...props}) {
  const {t} = useTranslation()
  const {rowData, orderDetail, warehouseInfo, employeeInfo} = props
  return (
    <div className="shipper-wrapper">
      <div className="shipper-detail-title upos-text-indygo-dye upos-text-roboto-medium-500">
        {t('tranport_infomation')}
      </div>
      <div className=" bg-order-cmp ">
        <div className="header-shipper-tab">
          <div className="order-shipper-id upos-text upos-text-title upos-text-indygo-dye">
            <div className={orderDetail.shipping_status_id !== '21' ? "upos-show-item" : "upos-hide-item"}>
              {orderDetail.shipping_status_id !== '21' ? orderDetail.id : null}
              {/* {802000161550} */}
            </div>
            <TrackingStatus status={orderDetail.shipping_status_id} />
          </div>
          <div
            className={
              orderDetail.shipping_status_id !== '21'
                ? 'order-page-function-button'
                : 'order-page-function-button upos-disable-icon'
            }
          >
            <img src="/svg/print.svg" />
          </div>
        </div>
        <div className="detail-shipper-wrapper">
          <div className="detail-shipper-1">
            {infoLine({
              label: t('shipping_partner'),
              value: getLogoShipperPartner(
                orderDetail.order_partner_ship || '--',
              ),
            })}
            {infoLine({
              label: t('date_created'),
              value: orderDetail.dt_created || '--',
            })}
            {infoLine({
              label: t('weight'),
              value: orderDetail.weight || '--',
            })}
            {infoLine({
              label: t('dimenson'),
              value: `${orderDetail.lengh || '--'} x ${
                orderDetail.width || '--'
              } x ${orderDetail.height || '--'}`,
            })}
            {infoLine({
              label: t('require_get_order'),
              value: t(getRequestGood(orderDetail.request_goods)),
            })}
            {infoLine({
              label: t('require_send_order'),
              value: t(getRequestGood(orderDetail.recipient_view)),
            })}
            {infoLine({
              label: t('shipping_fee'),
              value: `${displayNumber(orderDetail.ship_fee)} ₫`,
            })}
            {infoLine({
              label: t('cod_amount'),
              value: `${displayNumber(orderDetail.cod)} ₫`,
            })}
            {infoLine({
              label: t('insurance'),
              value: t(getInsurance(orderDetail.is_insurrance)),
            })}
            {infoLine({
              label: t('payment_side'),
              value: t(getPaymentSide(orderDetail.payment_method)),
            })}
            <ButtonGroup
              list={[
                {
                  label: t('cancel_order'),
                  fnFunction: () => {},
                  customClass: 'save-draft',
                },
                {
                  label: t('cancel_send'),
                  fnFunction: () => {},
                  customClass: 'create-order',
                },
              ]}
              customClassName="shipper-detail-button-group"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ShipperDetail
