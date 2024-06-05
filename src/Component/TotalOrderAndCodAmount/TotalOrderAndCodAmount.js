import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../api/api";
import { getUrlDataChart } from "../../api/url";
import { OrderContext } from "../../LayoutWrapper";
import { displayNumber } from "../../util/functionUtil";

export default function TotalOrderAndCodAmount({ ...props }) {
  const { t } = useTranslation();
  //   const [state, dispatch] = useContext(OrderContext);
  const { obj } = props;
  //   const [obj, changeObj] = useState({});
  const didmountComp = () => {
    // const endDate = moment(
    //   state.ObjectFilter.date_querry.range.end_date
    // ).format("YYYY-MM-DD");
    // const startDate = moment(
    //   state.ObjectFilter.date_querry.range.start_date
    // ).format("YYYY-MM-DD");
    // const url = getUrlDataChart(startDate, endDate);
    // getData(url).then((res) => {
    //   if (res && res.data && res.data.success) {
    //     const data = res.data.data;
    //     // "total_orders": "0",
    //     // "total_amount": "0",
    //     const newObj = {
    //       total_orders: data.total_orders,
    //       total_amount: data.total_amount,
    //     };
    //     changeObj(newObj);
    //   }
    // });
  };
  const unmountComp = () => {};
  useEffect(() => {
    didmountComp();
    return unmountComp();
  }, [obj]);

  return (
    <div className="TotalOrderAndCodAmount-wrapper">
      <div className="total-order">
        <div className="upos-text">{t("total")}</div>
        <div className="upos-text upos-bold">{obj.total_orders || 0}</div>
        <div className="upos-text">{t("order")}</div>
      </div>
      <div className="total-cod-amount">
        <div className="upos-text">{t("total_cod_amount")}</div>

        <div className="upos-text upos-bold">{`${displayNumber(
          obj.total_amount
        )} `}</div>
        <div className="upos-text">đ</div>
      </div>
    </div>
  );
}
