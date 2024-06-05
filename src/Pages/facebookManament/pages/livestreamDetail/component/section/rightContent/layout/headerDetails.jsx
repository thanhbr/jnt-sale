import { ICON_CONVERSATION } from '../../../../interface/icon'
import { Text } from '../../../../../../../../common/text'
import { format } from "date-fns"
import useFacebookDetailLiveStreamDetail from '../../../../hooks/useFacebookDetailComment'
import ReactImageFallback from 'react-image-fallback'
import React from 'react'
import { Tooltip } from '../../../../../../../../common/tooltip'

export const HeaderDetail = () => {

  const {data,methods} = useFacebookDetailLiveStreamDetail()
  const details = data.detail.liveStream
  const customer = details?.customer
  return (

    <div className={'content-liveStream__chat-title'}>
      <div className="content-liveStream__chat-avatar">
        <ReactImageFallback
          src={customer?.sender_avatar}
          fallbackImage="/img/facebook/fb_avatar.jpg"
          alt={customer?.sender_name}
          className="product-image"
        />
      </div>
      <div className="content-liveStream__chat-name">
        <p>
          <Text as={'p'} fontWeight={600}>{customer?.sender_name}</Text>
          <Text as={'p'} fontSize={10} lineHeight={'17px'} color={'#7C88A6'}>Thời gian tương tác gần nhất: {customer?.time ? format(new Date(customer?.time), 'dd/MM/yy HH:mm') : '---'}</Text>
        </p>
        <div className={"content-liveStream__chat-icon"}
             style={{cursor: 'pointer'}}
             onClick={() => methods.handleRightSide(details?.showRightSide)}
             data-active={details?.showRightSide}>
          <Tooltip title={details?.showRightSide ? 'Mở rộng khu vực hiển thị tin nhắn/bình luận' : 'Xem thông tin khách hàng & tạo đơn'}
                   placement={'left'}>{ICON_CONVERSATION.nextArrow}</Tooltip>
        </div>
      </div>
    </div>
  )
}