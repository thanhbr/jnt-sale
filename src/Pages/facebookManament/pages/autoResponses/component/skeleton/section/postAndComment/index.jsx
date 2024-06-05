import { StyledPostAndComment } from './_styled'
import React, { useState } from 'react'
import {FACEBOOK_ICONS} from "../../../../../../interfaces/_icons";
import {Text} from "../../../../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../../../../common/theme/_semantics";
import {Radio} from "../../../../../../../../common/form/radio";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";

export const PostAndComment = ({title,...props}) => {

  const [showContent,setShowContent] = useState(true)
  return (
    <StyledPostAndComment>
      <div className="info-step" data-success={false}>
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{FACEBOOK_ICONS.radio}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className={'form-step__left flex'}>
            <StyledPost>
              <div>
                <Text as={'label'}>Chọn bài viết <Text color={THEME_SEMANTICS.failed}>*</Text></Text>
                <div className="option-content">
                  <div className="radio-item">
                    <Skeleton variant="circular" width={18} height={18} />
                    <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
                  </div>
                  <div className="radio-item" >
                    <Skeleton variant="circular" width={18} height={18} />
                    <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
                  </div>
                </div>
                <Skeleton variant="rounded" width={'100%'} height={55}/>
              </div>
            </StyledPost>
          </div>
          <div className={'form-step__right flex'}>
            <StyledPost>
              <div>
                <Text as={'label'}>Chọn bình luận <Text color={THEME_SEMANTICS.failed}>*</Text></Text>
                <div className="option-content">
                  <div className="radio-item">
                    <Skeleton variant="circular" width={18} height={18} />
                    <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
                  </div>
                  <div className="radio-item" >
                    <Skeleton variant="circular" width={18} height={18} />
                    <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
                  </div>
                </div>
                <Skeleton variant="rounded" width={'100%'} height={55}/>
              </div>
            </StyledPost>
          </div>
        </div>
      </div>
    </StyledPostAndComment>
  )
}

const StyledPost = styled.div`
  width: 100%;
  .option-content{
    display: flex;
    margin-top: 8px;
    margin-bottom: 16px;
    .radio-item{
      display: flex;
      margin-right: 41px;
      >span{
        margin-left: 8px;
      }
    }
  }
  .post-notification{
    min-height: 51px;
    display: flex;
    align-items: center;
    background: rgba(26, 148, 255, 0.1);
    border: 1px solid #1A94FF;
    border-radius: 6px;
    padding: 5px 12px;
    &__icon{
      margin-right: 8px;
    }
  }
  .post-list{
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    margin-top: 16px;
    &[data-validate='true']{
      border: 1px solid #FF424E !important;
    }
    &__content{
      padding: 12px;
      &-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }
    }
  }
  .post-modal{
    &__name-warning{
      display: flex;
    }
    &__avatar {
      width: 32px;
      height: 32px;
      margin: 4px 12px 0 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__tooltip-script-name {
      max-width: 150px;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #1A94FF;
      }
    &__tooltip-name {
      max-width: 275px;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 24px;
      .post-modal__name{
        position: relative;
      }
      a{
        margin-left: 6px;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: -24px;
      }
    }
    &__noname{
      display: flex;
      a{
          margin-left: 6px;
          display: flex;
          align-items: center;
        }
    }
  }
  .post-modal__item{
    display: flex;
    align-items: center;
  
  }
  .post-table{
      //margin: 16px -16px 0 -8px;
      
      border: 1px solid #E2EAF8;
      border-radius: 8px;
      margin-top: 12px;
      &__cell{
        &-close{
          :hover{
            cursor: pointer;
          }
        }
       &:nth-child(1) {
        width: 68%;
       }
       &:nth-child(2) {
        width: 24%;
       }
       &:nth-child(3) {
        width: 8%;
       }
      }
      &__thead{
        border: none;
        .tr__container{
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
        
        }
      }
      .tr__container{
        border: none;
      
      }
  }
  .content-table{
     max-height: 267px;
     overflow: auto;
  }

`