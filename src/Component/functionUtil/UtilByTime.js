import Excel from 'Component/ExcelByTime'
export default function UtilByTime({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
