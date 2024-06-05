import Excel from 'Component/ExcelImport'
export default function UtilImport({...props}) {
  return (
    <div className="order-function-wrapper">
      <Excel />
      <img src="/svg/print.svg" />
    </div>
  )
}
