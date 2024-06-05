import { useTranslation } from "react-i18next";

export default function TrackingStatus({ ...props }) {
  const { status } = props;
  const text = status ? status.toUpperCase() : "";
  const { t } = useTranslation();
  switch (text) {
    case "6": // "Chuyển hoàn thành công"
      return (
        <div className="upos-text traking-button success-refund">
          {t("success-refund")}
        </div>
      );
    case "17": // "Chờ chuyển hoàn"
      return (
        <div className="upos-text traking-button waitting-refund">
          {t("waitting-refund")}
        </div>
      );
    case "23": // "Kiện vấn đề"
      return (
        <div className="upos-text traking-button problem-detected">
          {t("problem-detected")}
        </div>
      );
    case "3": // "Đang phát hàng"
      return (
        <div className="upos-text traking-button now-tranport">
          {t("now-delivering")}
        </div>
      );
    case "22": // "Đang vận chuyển"
      return (
        <div className="upos-text traking-button now-delivering">
          {t("now-tranport")}
        </div>
      );

    case "2": // Lấy hàng thành công
      return (
        <div className="upos-text traking-button sucess-get-order">
          {t("sucess-get-order")}
        </div>
      );
    case "GỬI ĐƠN GIAO HÀNG":
    case "1": // "Gửi đơn giao hàng"
      return (
        <div className="upos-text traking-button sended-order">
          {t("sended-order")}
        </div>
      );
    case "4": // Giao hàng thành công"
      return (
        <div className="upos-text traking-button sended-success">
          {t("sended-success")}
        </div>
      );
    case "5": // Chuyển hoàn
      return (
        <div className="upos-text traking-button refund-transfer">
          {t("refund-transfer")}
        </div>
      );
    case "20": // Chờ đối soát"
      return (
        <div className="upos-text traking-button waiting-for-cross-examination">
          {t("waiting-for-cross-examination")}
        </div>
      );
    case "19": // Đã đối soát"
      return (
        <div className="upos-text traking-button success-cross-examination">
          {t("success-cross-examination")}
        </div>
      );
    case "7": // Hủy giao hàng"
      return (
        <div className="upos-text traking-button cancel-tranport">
          {t("cancel-tranport")}
        </div>
      );
    case "15": // Hủy"
      return (
        <div className="upos-text traking-button cancel-order">
          {t("cancel-order")}
        </div>
      );
    case "8": // Bán tại cửa hàng"
      return (
        <div className="upos-text traking-button sale-at-shop">
          {t("sale-at-shop")}
        </div>
      );
    case "21": // "Đơn nháp"
      return (
        <div className="upos-text traking-button order-draft">
          {t("order-draft")}
        </div>
      );
    case "TẠO ĐƠN HÀNG": //
      return (
        <div className="upos-text traking-button sale-at-shop">
          {t("create_order")}
        </div>
      );
    case "THAY ĐỔI TRẠNG THÁI": //
      return (
        <div className="upos-text traking-button cancel-order">
          {t("change_status")}
        </div>
      );
    default:
      return (
        <div className="upos-text traking-button cancel-order">
          {t("no_data")}
        </div>
      );
  }
}
// "id": "4",
// "name": "Giao hàng thành công"
// {
//   "user_name": "Huỳnh Quốc Tuấn",
//   "type": "Thay đổi trạng thái",
//   "dt_created": "2021-03-17 14:08:06"
// },
// {
//   "user_name": "Huỳnh Quốc Tuấn",
//   "type": "Tạo đơn hàng",
//   "dt_created": "2021-03-17 14:07:11"
// }
// "id": "5",
// "name": "Chuyển hoàn"

//  "id": "20",
//   "name": "Chờ đối soát"

//   "id": "19",
//   "name": "Đã đối soát"

//   "id": "7",
//   "name": "Hủy giao hàng"

//     "id": "15",
//     "name": "Hủy"

//     "id": "8",
//     "name": "Bán tại cửa hàng"

//     "id": "21",
//     "name": "Đơn nháp"
// }
