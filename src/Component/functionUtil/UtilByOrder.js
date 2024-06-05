import Excel from 'Component/ExcelByOrder'
export default function UtilByOrder({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
