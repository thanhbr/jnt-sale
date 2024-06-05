import {StyledRightContent} from './styled'
import {EmptyContent} from './empty'
import {Text} from '../../../../../../../common/text'
import {TagCustomer} from '../../chatAction/tag'
import useFacebookDetailLiveStreamDetail from '../../../hooks/useFacebookDetailComment'
import {HeaderDetail} from './layout/headerDetails'
import {Spinner} from '../../../../../../../common/spinner'
import {CommentConversation} from '../../comment'
import React, {memo, useEffect, useRef} from 'react'
import {CustomerInformation} from '../../customerInformation/CustomerInformation'
import {ReplyTyping} from '../../chatAction/reply'
import {Loading} from '../../../../../../../common/loading'
import {DrawerOrderTab} from '../../order'
import {ICON_CONVERSATION} from "../../../interface/icon";
import {CustomToolTip} from "../../../../../../../Component/tooltip/CustomTooltip";
import {Tooltip} from "../../../../../../../common/tooltipv2";

export const RightContent = () => {
  const {data,methods} = useFacebookDetailLiveStreamDetail()
  const details = data.detail.liveStream
  const tab = data.detail.tabInfo
  const listItems = details.list
  const liveStreamRef = useRef(null)
  return (
    <StyledRightContent>
      {data.detail?.loading ? (
        <div className={'spinner-content'}>
          <Spinner size={54} thickness={5} />
        </div>
      ) : listItems.length > 0 ? (
        <div className={'content-liveStream'} id={details.customer.code}>
          <div
            className={'content-liveStream__chat'}
            data-active={details?.showRightSide}
          >
            <HeaderDetail />
            <div className={'dialogue-content-wrapper'}>
              <div className="content-liveStream__body">
                <div className={'content-liveStream__body-xxx'}>
                  <CommentConversation
                    details={details}
                    listItems={listItems}
                    liveStreamRef={liveStreamRef}
                  />
                </div>
                <div className={'dkjxxx'}></div>
                <div style={{display: 'block'}}>
                  <div
                    className={'content-liveStream__chat-action'}
                    style={{padding: '0'}}
                  >
                    {!!details?.typing?.text?.comment?.comment_id &&
                      details?.typing?.text?.commentType == 'reply' && (
                        <ReplyTyping />
                      )}
                    <TagCustomer />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={'content-liveStream__info'}
            data-active={details?.showRightSide}
          >
            <div className={'liveStream-info__title'}>
              <div
                className={'liveStream-info__title-tab'}
                data-active={tab == 1}
                onClick={() => tab == 2 ? methods.handleTabActive(1) : ''}
              >
                <Text className={'customer-title'}
                      as={'p'} fontWeight={600}
                      color={tab == 1 ? '#1E9A98' : '#00081D'}
                      style={{display: 'flex', alignItems: 'center'}}
                      data-error={data.detail.customerInfor?.isNotEnoughCustomerInfo} // fail validate
                >
                  Thông tin khách hàng
                  {!!data.detail.customerInfor?.isNotEnoughCustomerInfo
                  && <CustomToolTip title={'Chưa đủ thông tin khách hàng để tạo đơn'}
                              placement={'bottom'}
                              style={{display: 'flex'}}
                  >
                    {ICON_CONVERSATION.errorCircle}
                  </CustomToolTip>
                  }
                </Text>
                <Tooltip className={'tooltip'} baseOn={'height'} title={'Hoàn thành thông tin này trước khi tạo đơn hàng'}>
                  <Text as={'p'} fontSize={10} color={tab == 1 ? '#1E9A98':'#7C88A6'}>
                  Hoàn thành thông tin này trước khi tạo đơn hàng
                </Text></Tooltip>

                {tab == 1 && <div className={'bottom-line'}></div>}
              </div>
              <div
                className={'liveStream-info__title-tab'}
                data-active={tab == 2}
                onClick={() => tab == 1 ? methods.handleTabActive(2) : ''}
              >
                <Text as={'p'} fontWeight={600} color={tab == 2 ? '#1E9A98':'#00081D'}>
                  Đơn hàng
                </Text>
                <Tooltip className={'tooltip'} baseOn={'height'} title={'Thêm thông tin sản phẩm, thanh toán và vận chuyển'}>
                  <Text as={'p'} fontSize={10} color={tab == 2 ? '#1E9A98':'#7C88A6'}>
                    Thêm thông tin sản phẩm, thanh toán và vận chuyển
                  </Text>
                </Tooltip>

                {tab == 2 && <div className={'bottom-line'}></div>}
              </div>
            </div>
            <div className={'liveStream-info__content'}>
              {tab == 1 && <CustomerInformation/>}
              {tab == 2 && <DrawerOrderTab />}
            </div>
          </div>
        </div>
      ) : (
        <div className={'content-liveStream__empty'}>
          <EmptyContent />
        </div>
      )}

      {data.loading && <Loading />}
    </StyledRightContent>
  )
}
export default memo(RightContent)
