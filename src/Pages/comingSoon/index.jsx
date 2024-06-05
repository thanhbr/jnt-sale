import React from 'react'
import movDev from './img/comingsoon.png'
import { Text } from '../../common/text'
import { StyledComingSoon } from './styled'

export default () => {
  return (
    <StyledComingSoon>
      <div className={'comingsoon-content'}>
        <img src={movDev} alt="Đang phát triển"/>
        <p className={"title-page"}> Tính năng đang phát triển </p>
        <p className={"content-page"}> Tính năng này sẽ sớm được ra mắt thôi, vì vậy hãy theo dõi EVO bạn nhé! </p>
      </div>
    </StyledComingSoon>
  )
}