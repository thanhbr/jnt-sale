import { Text } from '../../../../../../../../../common/text'
import ReactImageFallback from 'react-image-fallback'
import { Tooltip } from '../../../../../../../../../common/tooltip'
import { ICON_CONVERSATION } from '../../../../../interface/icon'
import { format } from 'date-fns'
import useFacebookCustomerInfor from '../../../../..//hooks/useFacebookCustomerInfor'
import { transformMessage } from '../../../../../utils/transform'

export const CustomerMessage = ({ data, details, ...props }) => {
  const attachments = data?.attachments || {}
  const { methods } = useFacebookCustomerInfor()
  return (
    <>
      <div className="item-message" {...props}>
        <div className="item-message__chat-avatar">
          <ReactImageFallback
            src={details?.customer?.avatar}
            fallbackImage="/img/facebook/fb_avatar.jpg"
            alt={data?.name}
          />
        </div>
        <div className={'item-message__container'}>
          {data?.message
            ?
            <div className={'item-message__parent'}>
              <div className="item-message__content"
                   style={{ borderRadius: '18px 18px 18px 18px'}}>
                <div className={'xxx-xyz'}>
                  <div className={'xxx-xxyz'}></div>
                </div>
                <Tooltip placement="left-start" className={'xxx-xxl'}
                         title={data?.created_time ? format(new Date(data?.created_time), 'dd/MM/yy HH:mm') : '---'}>
                  <Text as={'p'} dangerouslySetInnerHTML={{ __html: transformMessage(data?.message) }}/>
                </Tooltip>
              </div>
              <div className={'item-message__content-action'} onClick={e => {methods.onAddressSplit(data?.message)}}>
                <Tooltip className={'xxx-tooltip-custom'} title={'Chọn thông tin này làm địa chỉ tạo đơn hàng'}>
                  {ICON_CONVERSATION.addLocation}
                </Tooltip>
              </div>
            </div>
            :

            <div className="item-message__parent">
              {
                !!attachments?.data && attachments.data.map((item, index) => {
                  if (item.mime_type == 'image/jpeg')
                    return (
                      <div className="item-message__content" key={index}
                           style={{
                             padding: 0,
                             overflow: 'hidden',
                             display: 'flex',
                             cursor: 'pointer',
                             borderRadius: '18px',
                             background: 'transparent'
                           }}>
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
          }
        </div>
      </div>
    </>
  )
}