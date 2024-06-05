import Excel from 'Component/ExcelByProduct'
export default function UtilByProduct({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
