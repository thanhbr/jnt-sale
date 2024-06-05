import {useTranslation} from 'react-i18next'

export default function RenderNote({...props}) {
  const {t} = useTranslation()
  const {onChangeTextArea = () => {}, textNote = '', title = ''} = props
  return (
    <>
      <div className="label-input payment-detail-tran">
        {title ? t(title) : ''}
      </div>
      <textarea
        value={textNote}
        onChange={e => onChangeTextArea(e)}
        className="upos-textare upos-text input-boderfocus-indent"
      />
    </>
  )
}
