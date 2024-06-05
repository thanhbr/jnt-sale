import Excel from 'Component/ExcelByStaff'
export default function UtilByStaff({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
