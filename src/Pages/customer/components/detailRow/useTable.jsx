import clsx from "clsx"
import { parseInt } from "lodash"
import moment from "moment"
import CircleIcon from '@mui/icons-material/Circle';
// import IconHalftCirclePaymentStatus from "../../../../public/img/order/haft_circle_payment_status.svg"

export const useTable = () => {
  const handleShippingStatusName = (name = "") => {
    return (
      <div className={clsx("border-solid rounded font-bold text-xs", {
        colorStatusGray: name === "Đơn nháp",
        colorStatusOrange: name === "Bán tại cửa hàng",
        colorStatusOranges: name === "Đang giao hàng",
        colorStatusBlue: name === "Gửi đơn giao hàng",
        colorStatusRed: name === "Hủy đơn hàng",
        colorStatusGreen: name === "Giao hàng thành công",
        colorStatusReds: name === "Hủy giao hàng",
        colorStatusGreens: name === "Lấy hàng thành công",
        colorStatusRedd: name === "Hủy",
        colorStatusBlues: name === "Đang vận chuyển",
        colorStatusDarkGreen: name === "Đã đối soát",
        colorStatusDarkGreens: name === "Chuyển hoàn thành công",
        colorStatusRedError: name === "Kiện vấn đề",
      })}>
        {name}
      </div>
    )
  }
  const formatDateTime = (date) => {
    return moment(date).format("DD/MM/YYYY hh:mm")
  }

  const handleStatusPayment = (total_amount = 0, total_payment = 0) => {
    const amount = parseInt(total_amount)
    const payment = parseInt(total_payment)
    if (amount === payment || amount < payment) return <><div className="circle"><div className="circle-green circle-custom"></div>Đã thanh toán</div></>
    if (payment > 0 && amount > payment ) return <><div className="circle"><img src='/img/order/haft_circle_payment_status.svg'  alt='avatar' className="circle-custom"/>Thanh toán 1 phần</div></>
    return <><div className="circle"><div className="circle-red circle-custom"></div>Chưa thanh toán</div></>
  }
  return {
    handleShippingStatusName,
    formatDateTime,
    handleStatusPayment
  }
}
