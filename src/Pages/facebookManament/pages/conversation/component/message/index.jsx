import {format} from "date-fns";
import {Text} from "../../../../../../common/text";
import {CustomerMessage} from "../section/rightContent/layout/customer/customerMessage";
import {PageMessage} from "../section/rightContent/layout/page/pageMessage";
import React, {useEffect, useRef} from "react";
import useFacebookDetailConversation from "../../hooks/useFacebookDetailConversation";

export const MessageConversation = (
  {
    details,
    listItems,
    conversationRef,
    ...props
  }
  ) => {
  const { data, methods } = useFacebookDetailConversation()
  const messagesEndRef = useRef(null)
  const paging = data.detail.conversation.paging
  const scrollView = data.detail.conversation?.scrollToView
  const viewRef = useRef(null)
  useEffect(() => {
    if (viewRef.current){
      viewRef.current?.scrollIntoView()
    }
  }, [listItems])

  const handleScroll = e => {
    if (data.detail.loading) {
      return
    }
    const scrollTop = conversationRef.current.scrollTop
    if (scrollTop < 200) {
      //fetch messages
      !!paging?.next && methods.loadMoreDetail(paging?.next)
    }
  }
  return (
    <div className={'content-conversation__chat-description'}
         style={{
           background: 'linear-gradient(89.91deg, #EFF6FC 0.08%, #E3F0FC 30.62%, #E1EFFC 64.57%, #E5F1FC 88%, #EEF5FC 99.93%)',
           paddingBottom: '8px'
         }}>
      <div className={'scroll-custom'}
           style={{overflow: 'auto',
            width: '100%',
            height: '100%'}}
           ref={conversationRef}
           onScroll={handleScroll}
      >
        {listItems.map((item, index) =>
          <div key={index}>
            {item?.created_time && format(new Date(item?.created_time), 'dd/MM/yy') !== format(new Date(listItems[index - 1]?.created_time || 0), 'dd/MM/yy') &&
            <Text as={'p'} fontSize={'13px'} style={{ padding: '24px', textAlign: 'center', width: 'auto' }}>
              {format(new Date(item?.created_time), 'dd/MM/yyyy')}
            </Text>
            }
            {
              item.from?.id !== details?.customer?.page_id
                ?
                <CustomerMessage details={details} key={index} position={index} data={item}/>
                :
                <PageMessage key={index} data={item}/>
            }
            {index == scrollView && <div ref={viewRef} className={'abc-view'}></div>}
          </div>
        )
        }
        <div className={'scroll-into-view'} ref={messagesEndRef}></div>
      </div>
    </div>
  )
}