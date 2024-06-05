import { useContext } from "react";
import { OrderContext } from "../../LayoutWrapper";

const checkedIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
      fill="#3DDBBC"
    />
    <path
      d="M5.70711 7.83833C5.31658 7.4478 4.68342 7.4478 4.29289 7.83833C3.90237 8.22885 3.90237 8.86201 4.29289 9.25254L5.70711 7.83833ZM7.18182 10.7273L6.47471 11.4344C6.68374 11.6434 6.97455 11.7492 7.26904 11.7234C7.56353 11.6977 7.83152 11.5429 8.00105 11.3007L7.18182 10.7273ZM11.8192 5.84617C12.1359 5.39372 12.0259 4.77019 11.5735 4.45347C11.121 4.13676 10.4975 4.24679 10.1808 4.69924L11.8192 5.84617ZM4.29289 9.25254L6.47471 11.4344L7.88893 10.0201L5.70711 7.83833L4.29289 9.25254ZM8.00105 11.3007L11.8192 5.84617L10.1808 4.69924L6.36259 10.1538L8.00105 11.3007Z"
      fill="white"
    />
  </svg>
);
const unCheckIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#B5CBE8" />
  </svg>
);

const dash = (
  <svg
    width="16"
    height="2"
    viewBox="0 0 16 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="0.5" width="16" height="1" fill="#B5CBE8" />
  </svg>
);
const CheckClientInfomation = (customerInfo) =>
  !!(
    customerInfo.ward.value &&
    customerInfo.area.value.district_id &&
    customerInfo.area.value.city_id &&
    customerInfo.name &&
    customerInfo.address
  );
const CheckProductInfo = (product_info = []) => !!product_info.length;
const CheckOrderInfo = (order_info = {}) => !!order_info.origin.value;
const CheckTranportInfo = (state) => {
  try {
    const { shipping_info } = state.new_order;
    const partner = shipping_info.isSelected;
    let partnerInfo = null;
    if (partner) partnerInfo = shipping_info.partner[partner];
    if (!partnerInfo) {
      return false;
    }
    switch (partner) {
      case "4":
      case "1":
        if (
          partnerInfo.is_insurrance === "1" &&
          (!partnerInfo.insurrance_value || partnerInfo.insurrance_value === "")
        ) {
          return false;
        }
        break;
      case "2":
        if (
          !partnerInfo.insurrance_value ||
          partnerInfo.insurrance_value === ""
        ) {
          return false;
        }
        break;
      case "3":
        if (
          !partnerInfo.lengh ||
          !partnerInfo.width ||
          !partnerInfo.height ||
          (partnerInfo.is_insurrance === "1" &&
            (!partnerInfo.insurrance_value ||
              partnerInfo.insurrance_value === ""))
        ) {
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  } catch (error) {}
};
export default function StatusOrderCheck({ ...props }) {
  const state = useContext(OrderContext)[0];
  const customerInfo = state.new_order.client_info;
  const { order_info } = state.new_order;
  const { product_info } = state.new_order;

  const statusCustomer = CheckClientInfomation(customerInfo);
  const statusProduct = CheckProductInfo(product_info);
  const statusTranport = CheckTranportInfo(state);
  const statusOrder = CheckOrderInfo(order_info);

  const list = [
    { status: statusCustomer, label: "Thông tin khách hàng" },
    { status: statusProduct, label: "Thông tin sản phẩm" },
    { status: statusTranport, label: "Thông tin vận chuyển" },
    { status: statusOrder, label: "Thông tin đơn hàng" },
  ];
  return (
    <div className="status-order-wrapper">
      {list.map((item, index) => {
        // console.log(`lengt ${  list.length  }index ${  index}`);
        return (
          <>
            <div className="icon-order-status scale-animation add-effect-all">
              {item.status ? checkedIcon : unCheckIcon}
            </div>
            <div className="label-status">{item.label}</div>
            {!(index === list.length - 1) ? (
              <div className="status-dash">{dash}</div>
            ) : null}
          </>
        );
      })}
    </div>
  );
}
