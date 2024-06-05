import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import { useTranslation } from 'react-i18next'

export default function NotFound({className = '', style}) {
  const {t} = useTranslation()
  return (
    <div className={`p-404 ${className}`}>
      <div className="p-404__container">
        <img
          src={'/img/404/Error.png'}
          alt="error-404"
          className="p-404__img-error"
        />
        <Text
          fontSize={32}
          fontWeight={600}
          textAlign="center"
          style={{display: 'block', margin: '3rem auto 1rem'}}
        >
          {t('general_404')}
        </Text>
        <Text
          fontSize={18}
          style={{display: 'block', color: '#7C88A6', marginBottom: '1.5rem'}}
        >
          {t('general_404_content')}
        </Text>
        <Link to="/">
          <Button appearance="secondary" style={{width: '214px', height: '36px'}}>
            {t('general_return_home')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
