import Excel from 'Component/ExcelLowQuantity'
export default function UtilByLowQuan({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
