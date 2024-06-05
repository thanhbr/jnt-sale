import styled from 'styled-components'
import { ICON_CONVERSATION, ICON_FILTER } from '../../interface/icon'
import { useNavigate } from 'react-router-dom'
import React, { useRef } from 'react'
import { Tooltip } from '../../../../../../common/tooltip'
import useFacebookLiveStreamDetail from '../../hooks/useFacebookLiveStreamDetail'
import useGlobalContext from 'containerContext/storeContext'

export const ActivePage = () => {

  const {data, methods} = useFacebookLiveStreamDetail()
  const nav = useNavigate()
  const [state] = useGlobalContext()
   const accessFanpage = state.facebook.fanpage.filter(item => !!item.manage_permission).map(item => item.page_id)

  const containerSlide = useRef()

  return (
    <Styled>
      <div className={'list-page'} ref={containerSlide} >
        <Tooltip title={data.page.detail?.page_name} placement={'right'}>
          <div className={'list-page__item'}>
            <div className={'list-page__avatar'}>
              <img src={data.page.detail?.page_avatar} alt={data.page.detail?.page_name}/>
            </div>
          </div>
        </Tooltip>
        <Tooltip title={'Quay lại danh sách livestream'} placement={'right'}>
          <div style={{ cursor: 'pointer' }} onClick={() => nav(`/facebook/livestream${accessFanpage.length > 0 ? '?page_id=' + accessFanpage.toString() : ''}`)}>{ICON_CONVERSATION.backPage}</div>
        </Tooltip>
      </div>
    </Styled>
  )
}

const Styled = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
  .slick-slide{
    display: flex;
    justify-content: center;
  }
  .slick-disabled{
    display: none!important;
  }
  .slick-next{
    top: inherit;
    left: 0;
    bottom: -26px;
    width: 100%;
    z-index: 2;
  }
  .slick-prev{
    top: -10px!important;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  .slick-slider{
    margin-bottom: 24px;
  }
  .list-page{
    padding: 0 10px;
    &__item{
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      cursor: pointer;
      position: relative;
      svg{
        position: absolute;
        bottom: -4px;
      }
    }
    &__avatar{
      width: 36px;
      height: 36px;
      background: #0f131a;
      border-radius: 50%;
      overflow: hidden;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`