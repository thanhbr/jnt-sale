import Excel from 'Component/ExcelTransportInventory'
export default function UtilTransport({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
