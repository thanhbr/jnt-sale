import {useTranslation} from 'react-i18next'

export default function SingleButton({...props}) {
  const {t} = useTranslation()
  const {
    label = 'name_here',
    value = '',
    customClassName = '',
    onCallBack = () => {},
    onlyIcon = false,
    path = '',
    fullIcon = '',
  } = props
  return (
    <div
      onClick={() => onCallBack()}
      className={`cursor-pointer upos-button-single upos-text ${
        customClassName || ''
      }`}
    >
      {fullIcon ? (
        <div className="single-full-descript-button">
          <img src={fullIcon} />
          <p>{t(label)}</p>
        </div>
      ) : onlyIcon ? (
        <img src={path} />
      ) : (
        t(label) || '--'
      )}
    </div>
  )
}
