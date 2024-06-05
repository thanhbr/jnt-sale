import {useTranslation} from 'react-i18next'

export default function Download(params) {
  const {t} = useTranslation()
  return (
    <div className="header-download-app">
      <img src="/svg/down-app.svg" />
      <div>{t('download_app')}</div>
    </div>
  )
}
