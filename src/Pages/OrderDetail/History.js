
import { useTranslation } from "react-i18next";
import moment from "moment";
import TrackingStatus from "../../Component/TrackingStatus/trackingStatus";
import { v4 as uuidv4 } from 'uuid';

export default function History({ ...props }) {
  const { t } = useTranslation();
  const { rowData, orderDetail, warehouseInfo, employeeInfo } = props;
  const log = orderDetail.order_logs || [];
  const DATA = [];
  log.map((value, index) => {
    DATA.push({
      date: moment(value.dt_created, "YYYY-MM-DD hh:mm:ss").format(
        "DD-MM-YYYY"
      ),
      time: moment(value.dt_created, "YYYY-MM-DD hh:mm:ss").format("HH:mm:ss"),
      actor: value.user_name,
      status: value.type,
      description: value.type,
      // description: value.
    });
  });
  return (
    <div className="info-wrapper bg-order-cmp">
      <div className="shipper-info-header-wrapper">
        <div className="order-id-info">
          <div className="upos-text">{t("order_id_")}</div>
          <div className=" upos-text upos-text-title">{orderDetail.id}</div>
        </div>
        <div className="shipper-id-info">
          <div className="upos-text">{t("billcode")}</div>
          <div className="upos-text upos-text-title">
            {orderDetail.billcode}
          </div>
        </div>
      </div>
      <div className="shipper-tracking-wrapper">
        {DATA.map((item, index) => (
            <div key={uuidv4()} className="tracking-wrapper">
              <div className="left-tracking">
                <div className="tracking-time-wrapper">
                  <div className="upos-text upos-text-indygo-dye upos-text-600 tracking-date">
                    {item.date}
                  </div>
                  <div className="upos-text upos-text-indygo-dye tracking-time">
                    {item.time}
                  </div>
                </div>
                <div className="tracking-diagram-wrapper">
                  <div className="tracking-line-1" />
                  <div className="tracking-circle" />
                  <div className="tracking-line-2" />
                </div>
              </div>
              <div className="right-tracking">
                <TrackingStatus status={item.status} />
                <div className="wrapper-description-history">
                  <div className="upos-text">{`${item.actor} ${t("was")} ${
                    item.description
                  }`}</div>
                  {/* <div className="upos-text actor-action">{`${item.actor} ${t("was")} ${item.description}`}</div>
                  <div className="upos-text action-time-type">{t("was")}</div>
                  <div className="upos-text upos-text-indygo-dye tracking-des">
                    {item.description}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
