import { StyledAutoResponseScript } from './_styled'
import {FACEBOOK_ICONS} from "../../../../../../interfaces/_icons";
import React, { useState } from 'react'
import {Text} from "../../../../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../../../../common/theme/_semantics";
import Skeleton from "@mui/material/Skeleton";
import {Switch} from "../../../../../../../customer/components/switch";
import {Textarea} from "../../../../../../../../common/form/textarea";
import {NotificationInside} from "../../../../../../layouts/general/notificationInside";
import styled from "styled-components";

export const AutoResponseScript = ({title,...props}) => {

  const [showContent,setShowContent] = useState(true)
  return (
    <StyledAutoResponseScript>
      <div className="info-step">
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{FACEBOOK_ICONS.radio}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className={'form-step__top flex'}>
            <div style={{width: 'calc(50% - 22px)', marginRight: '22px'}}>
              <StyledAutoResponse {...props}>
                <Text as={'p'} className={'auto-response__title'}>Kịch bản phản hồi tự động khi thỏa mãn điều kiện</Text>
                <div className={'auto-response__comment flex'}>
                  <Skeleton variant="rounded" width={32} height={20} />
                  <Skeleton variant="text" width={100} sx={{ fontSize: '1rem',  marginLeft: '8px' }} />
                </div>
                <div className={'auto-response__comment-content'}>
                  <Skeleton variant="rounded" width={'100%'} height={88} />
                </div>
                <div className={'auto-response__comment flex'}>
                  <Skeleton variant="rounded" width={32} height={20} />
                  <Skeleton variant="text" width={100} sx={{ fontSize: '1rem', marginLeft: '8px'}} />
                </div>
                <div className={'auto-response__comment-content'}>
                  <Skeleton variant="rounded" width={'100%'} height={88} />
                </div>
              </StyledAutoResponse>
            </div>
          <div style={{width: 'calc(50% - 22px)', marginLeft: '22px'}}>
            <StyledAutoResponse {...props}>
              <Text as={'p'} className={'auto-response__title'}>Kịch bản phản hồi tự động khi không thỏa mãn điều kiện</Text>
              <div className={'auto-response__comment flex'}>
                <Skeleton variant="rounded" width={32} height={20} />
                <Skeleton variant="text" width={100} sx={{ fontSize: '1rem',  marginLeft: '8px' }} />
              </div>
              <div className={'auto-response__comment-content'}>
                <Skeleton variant="rounded" width={'100%'} height={88} />
              </div>
              <div className={'auto-response__comment flex'}>
                <Skeleton variant="rounded" width={32} height={20} />
                <Skeleton variant="text" width={100} sx={{ fontSize: '1rem', marginLeft: '8px'}} />
              </div>
              <div className={'auto-response__comment-content'}>
                <Skeleton variant="rounded" width={'100%'} height={88} />
              </div>
            </StyledAutoResponse>
          </div>
          </div>
        </div>
      </div>
    </StyledAutoResponseScript>
  )
}

const StyledAutoResponse = styled.div`
  .auto-response{
    &__title{
      margin-bottom: 16px;
    }
    &__comment{
      margin-bottom: 8px;
    }
    &__comment-content{
      margin-bottom: 24px;
      position: relative;
      textarea {
        resize: none;
      }
    }
    &__comment-addname{
      position: absolute;
      right: 12px;
      bottom: 5px;
      :hover{
        cursor: pointer;
      }
    }
  }
`
