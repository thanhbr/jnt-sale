import React, { useEffect, useState } from 'react'
import useFacebookDetailLiveStreamDetail from '../../hooks/useFacebookDetailComment'
import {CommentDetailConversation} from "./_commentDetail";
import {CommentGroupConversation} from "./_commentGroup";

export const CommentConversation = (
  {
    liveStreamRef,
    ...props
  }
) => {
  const { data, comment, methods } = useFacebookDetailLiveStreamDetail()
  const details = data.detail.liveStream
  return (
    <>
      {details?.isGroupPerson === 0? <CommentDetailConversation liveStreamRef={liveStreamRef}/>: <CommentGroupConversation liveStreamRef={liveStreamRef}/>}

    </>
  )
}

