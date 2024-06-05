import { StyledTitle } from './styled'
import ReactImageFallback from 'react-image-fallback'
import React, {useContext, useEffect, useState} from 'react'
import useFacebookLiveStreamDetail from '../../hooks/useFacebookLiveStreamDetail'
import { Tooltip } from '../../../../../../common/tooltip'
import { Text } from '../../../../../../common/text'
import { format } from 'date-fns'
import { ICON_CONVERSATION } from '../../interface/icon'
import { fNumber } from '../../../../../../util/formatNumber'
import {Button} from "../../../../../../common/button";
import {FacebookLivestreamContext} from "../../provider/_context";
import { facebookLiveStreamDetailActions as actions } from '../../provider/_actions'
import OtherLiveStream from "../modal/otherLiveStream";
import {useOtherLiveStream} from "../../hooks/useOtherLiveStream";
export const TitleLivestrem = () => {
  const { data } = useFacebookLiveStreamDetail()
  const detail = data.liveStream?.detail
    const {func,other} = useOtherLiveStream()
    useEffect(()=>{
        if(other.show){
            func.fetchList()
        }
    },[other.show])
  return (
    <StyledTitle>
      {detail?.reactions &&
      <div className={'title-content'}>
        <div className={'title-content__left'}>
          <ReactImageFallback
            src={detail?.thumbnails}
            fallbackImage="/img/facebook/no-post.png"
            alt={detail?.page_name}
          />
        </div>
        <div className={'title-content__right'}>
          <div className={'title-content__right-detail'}>
            <div className={'icon-live'} data-live={detail.status === 'LIVE'}>{ICON_CONVERSATION.live}</div>
            <div className={'title-content__right-name'}>
              <Tooltip title={'Bấm vào để xem bài viết gốc'} placement="bottom">
                <a href={detail?.link || ''} target={'__blank'}>
                  <Text lineHeight={'140%'}
                        color={'#1A94FF'}
                        fontWeight={600}>
                    {!!detail?.title ? detail?.title : '---'}
                  </Text>
                </a>
              </Tooltip>
            </div>
            <Text fontSize={'13px'} lineHeight={'140%'} as={'p'}>Đăng lúc: <Text fontSize={'13'} lineHeight={'140%'}
                                                                                 color={'#00081D'}
                                                                                 fontWeight={500}> ({detail?.created_time ? format(new Date(detail?.created_time), 'dd/MM/yy HH:mm') : '---'})</Text>
            </Text>
          </div>
          {detail.reactions.length > 0 &&
          <div className="title-content__livestream-reaction">
            {detail?.reactions.map(react => {
              if (react.value > 0){
                return (
                  <Text as={'p'} fontSize={10} lineHeight={'100%'}
                        style={{ display: 'flex', alignItem: 'center', marginRight: '8px', marginTop: '6px' }}>
                    <ReactImageFallback
                      src={`/img/facebook/react/${react.name}.png`}
                      alt={react.name}
                    />
                    &nbsp;{fNumber(react.value) || 0}
                  </Text>
                )
              }
            })}
            {detail?.share_count > 0 &&
              <Text as={'p'} fontSize={10} lineHeight={'100%'}
                    style={{ display: 'flex', alignItem: 'center', marginRight: '8px', marginTop: '6px' }}>
                <ReactImageFallback
                  src={`/img/facebook/react/share.png`}
                  alt={'share'}
                />
                &nbsp;{fNumber(detail?.share_count) || 0}
              </Text>
            }
          </div>
          }
        </div>
      </div>
      }
      <div>
        <Button onClick={func.handleOpen} className={'other-liveStream'} icon={ICON_CONVERSATION.post} appearance={'secondary'}>Xem bài đăng khác</Button>
      </div>
        {other.show && <OtherLiveStream/>}
    </StyledTitle>
  )
}