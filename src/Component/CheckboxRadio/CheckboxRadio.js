import { useTranslation } from "react-i18next"

const checked = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="5.25" stroke="#3DDBBC" strokeWidth="1.5" />
    <circle cx="6" cy="6" r="3" fill="#3DDBBC" />
  </svg>
)
const uncheck = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="5.25" stroke="#B5CBE8" strokeWidth="1.5" />
  </svg>
)
const CheckboxRadio = ({...props}) => {
  const {t} = useTranslation()
  try {
    const {
      list = [],
      callback = () => {},
      customClass = null,
      customIcon = {},
      title = '',
      selected = ""
    } = props
    return (
      <>
        <div className="label-input require-get-detail-tran">
          {title? t(title) : null}
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              callback(item)
            }}
            className={
              customClass
                ? `${customClass} upos-checkbox-wrapper cursor-pointer`
                : 'upos-checkbox-wrapper cursor-pointer'
            }
          >
            <div className="upos-check-icon">
              {selected === item.value
                ? (customIcon || {}).check || checked
                : (customIcon || {}).uncheck || uncheck}
            </div>
            <div className="upos-check-label">{item.label || ''}</div>
          </div>
        ))}
      </>
    )
  } catch (error) {
    console.log(`error ===========${error}`)
  }
}
export default CheckboxRadio
