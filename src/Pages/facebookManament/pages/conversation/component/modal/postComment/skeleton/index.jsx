import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import styled from 'styled-components'

export const PostListSkeleton = ({ ...props }) => {
  const SkelentonRows =Array.from(Array(20).keys())
  return (
    <>
      <StyledItemInfo>
        {
          SkelentonRows.map(item =>
            <div className={'popup-post-comment-export__content_main-body-td'} key={item} style={{padding:'10px'}}>
              <div className="popup-post-comment-export__content_main-body-td-post" style={{paddingTop: '11px'}}>
                <Skeleton variant="text" height={44} width={79} style={{marginLeft: '12px'}}/>
                <Skeleton variant="text" height={44} width={250} style={{marginLeft: '12px'}}/>
              </div>
              <div className="item-content__short-content-page">
                <Skeleton variant="circular" height={28} width={28}  style={{marginLeft: '12px',marginTop: '8px'}}/>
              </div>
              <div className="item-content__short-content-post">
                <Skeleton variant="text" height={44} width={335}/>
              </div>
              <div className="item-content__short-content-setting">
                <Skeleton variant="text" height={44} width={25} style={{marginLeft: '12px'}}/>
                <Skeleton variant="text" height={44} width={25} style={{marginLeft: '12px'}}/>
                <Skeleton variant="text" height={44} width={135} style={{marginLeft: '12px'}}/>
              </div>
            </div>
          )
        }
      </StyledItemInfo>
    </>
  )
}

const StyledItemInfo = styled.div`
 .item-content{
  &__short-content-post{
    width: 340px;
  }
  &__short-content-page{
    width: 135px;
    
  }
  &__short-content-setting{
    width: 185px;
    display: flex;
    
  }
 } 
`