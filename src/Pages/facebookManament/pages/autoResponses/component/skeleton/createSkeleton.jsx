import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import {BasicInfo} from "./section/basicInfo";
import {PostAndComment} from "./section/postAndComment";
import {AutoResponseScript} from "./section/autoResponseScript";

export const CreateAutoScriptSkeleton = ({ ...props }) => {
   return (
      <>
         <BasicInfo title={'Thông tin cơ bản'}/>
         <PostAndComment title={'Chọn bài viết và bình luận phản hồi'}/>
         <AutoResponseScript title={'Kịch bản phản hồi tự động'}/>
      </>
   )
}