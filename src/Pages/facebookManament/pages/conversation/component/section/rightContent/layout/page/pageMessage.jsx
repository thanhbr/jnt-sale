import { Text } from '../../../../../../../../../common/text'
import React, { useEffect, useRef } from 'react'
import ReactImageFallback from 'react-image-fallback'
import useFacebookDetailConversation from '../../../../../hooks/useFacebookDetailConversation'
import { transformMessage } from '../../../../../utils/transform'
import { Spinner } from '../../../../../../../../../common/spinner'

export const PageMessage = ({ data, ...props }) => {
  const attachments = data?.attachments || {}
  return (
    <>
      <div className="item-message__right" {...props}>
        {data?.message
          ?
          <>
            {data?.pending &&
            <div className={'spinner-mess-content'}>
              <Spinner size={18} thickness={5}/>
            </div>}
            <div
              className="item-message__right-content"
              style={{ borderRadius: '18px' }}
            >
              <div className={'xxx-xyz'}>
                <div className={'xxx-xxyz'}></div>
              </div>
              <div className="item-message__right-content-text" style={{wordBreak: 'break-all'}} dangerouslySetInnerHTML={{ __html: transformMessage(data?.message) }}/>
            </div>
          </>
          :
          !!attachments?.data && attachments.data.map((item, index) => {
            if (item.mime_type == 'image/jpeg')
              return (
                <div className="item-message__right-content" key={index}
                     style={{
                       padding: 0, overflow: 'hidden', display: 'flex', cursor: 'pointer',
                       borderRadius: '18px',
                       background: 'transparent'
                     }}>
                  {attachments?.pending &&
                  <div className={'spinner-mess-content'}>
                    <Spinner size={18} thickness={5}/>
                  </div>}
                  <ReactImageFallback
                    src={item?.image_data?.preview_url}
                    fallbackImage="/img/facebook/fb_avatar.jpg"
                    alt={'message images'}
                    onClick={() => console.log('hi lo')}
                    style={{ maxHeight: '200px' }}
                  />
                  {/*popup privew*/}
                </div>
              )
          })
        }
      </div>
    </>
  )
}