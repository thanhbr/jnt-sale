import Excel from 'Component/ExcelStockInventory.js'
export default function UtilByStockInventory({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
