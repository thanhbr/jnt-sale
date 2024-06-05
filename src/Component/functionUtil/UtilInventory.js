import Excel from 'Component/ExcelInventoryReport'
export default function UtilInventory({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
