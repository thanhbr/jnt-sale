import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import React from 'react'
import {Link} from 'react-router-dom'
import './index.scss'
import { useTranslation } from 'react-i18next'

export default function NoConnection({className = '', style}) {
  const {t} = useTranslation()
  return (
    <div className={`p-no-connection ${className}`}>
      <div className="p-no-connection__container">
        <img
          src={'/img/no-connection/no-connection.png'}
          alt="no-connection"
          className="p-no-connection__img-no-internet"
        />
        <Text
          fontSize={32}
          fontWeight={600}
          textAlign="center"
          style={{display: 'block', margin: '3rem auto 1rem'}}
        >
          {t('general_no_internet')}
        </Text>
        <Text
          fontSize={18}
          style={{display: 'block', color: '#7C88A6', marginBottom: '1.5rem'}}
        >
          {t('general_no_internet_content')}
        </Text>
        <Link to="/">
          <Button
            appearance="secondary"
            style={{width: '214px', height: '36px'}}
          >
            {t('general_reload_page')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
