import { StyledRightContent } from './styled'
import { EmptyContent } from './empty'
import { TagCustomer } from '../../chatAction/tag'
import { NotifyCustomer } from '../../chatAction/notify'
import { TypingCustomer } from '../../chatAction/typing'
import useFacebookDetailConversation from '../../../hooks/useFacebookDetailConversation'
import { HeaderDetail } from './layout/headerDetails'
import { Spinner } from '../../../../../../../common/spinner'
import { MessageConversation } from '../../message'
import { CommentConversation } from '../../comment'
import React, { memo, useEffect, useRef } from 'react'
import { ReplyTyping } from '../../chatAction/reply'
import { OrderContent } from './layout/orderContent'

export const RightContent = () => {
  const { data } = useFacebookDetailConversation()
  const details = data.detail.conversation
  const listItems = details.list
  const conversationRef = useRef(null)
  return (
    <StyledRightContent>
      {!details?.firstFrame ? (
        <div className={'content-conversation'} id={details.customer.code}>

          <div
            className={'content-conversation__chat'}
            data-active={details?.showRightSide}
          >
            {
              listItems.length > 0 && !data.detail?.loading
                ?
                <>
                  <HeaderDetail/>
                  <div className={'dialogue-content-wrapper'}>
                    <div className="content-conversation__body">
                      <div className={'content-conversation__body-xxx'}>
                        {details?.type == 1 ? (
                          <MessageConversation
                            details={details}
                            listItems={listItems}
                            conversationRef={conversationRef}
                          />
                        ) : (
                          <CommentConversation
                            details={details}
                            listItems={listItems}
                            conversationRef={conversationRef}
                          />
                        )}
                      </div>

                      <div className={'dkjxxx'}></div>
                      <div style={{ display: 'block' }}>
                        <div
                          className={'content-conversation__chat-action'}
                          style={{ padding: '0' }}
                        >
                          {/*reply*/}
                          {!!details?.typing?.text?.comment?.comment_id &&
                          details?.typing?.text?.commentType == 'reply' && (
                            <ReplyTyping/>
                          )}
                          {/*tag*/}
                          <TagCustomer/>
                          {/*notify*/}
                          {!details?.inMatchTime && details?.type == 1 && (
                            <NotifyCustomer/>
                          )}
                          {/*typing*/}
                          <TypingCustomer/>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                :
                <div className={'conversation-spinner-content'}>
                  <Spinner size={54} thickness={5}/>
                </div>
            }
          </div>
          <OrderContent/>
        </div>
      ) : (
        <div className={'content-conversation__empty'}>
          <EmptyContent/>
        </div>
      )}
    </StyledRightContent>
  )
}
export default memo(RightContent)
