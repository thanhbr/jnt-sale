import {Text} from '../../../../../../../../common/text'
import {CustomerInformation} from '../../../customerInformation/CustomerInformation'
import {DrawerOrderTab} from '../../../order'
import React from 'react'
import useFacebookDetailConversation from '../../../../hooks/useFacebookDetailConversation'
import {ICON_CONVERSATION} from "../../../../interface/icon";
import {CustomToolTip} from "../../../../../../../../Component/tooltip/CustomTooltip";
import {Tooltip} from "../../../../../../../../common/tooltipv2";

export const OrderContent = () => {
  const {data, methods} = useFacebookDetailConversation()
  const details = data.detail.conversation
  const tab = data.detail.tabInfo
  return (
    <div
      className={'content-conversation__info'}
      data-active={details?.showRightSide}
    >
      <div className={'conversation-info__title'}>
        <div
          className={'conversation-info__title-tab'}
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
            <Text as={'p'} fontSize={10}
                  color={tab == 1 ? '#1E9A98' : '#7C88A6'}
            >
              Hoàn thành thông tin này trước khi tạo đơn hàng
            </Text>
          </Tooltip>
          {tab == 1 && <div className={'bottom-line'}></div>}
        </div>
        <div
          className={'conversation-info__title-tab'}
          data-active={tab == 2}
          onClick={() => tab == 1 ? methods.handleTabActive(2) : ''}
        >
          <Text as={'p'} fontWeight={600} color={tab == 2 ? '#1E9A98' : '#00081D'}>
            Đơn hàng
          </Text>
          <Tooltip className={'tooltip'} baseOn={'height'} title={'Thêm thông tin sản phẩm, thanh toán và vận chuyển'}>
            <Text as={'p'} fontSize={10} color={tab == 2 ? '#1E9A98' : '#7C88A6'}>
              Thêm thông tin sản phẩm, thanh toán và vận chuyển
            </Text>
          </Tooltip>

          {tab == 2 && <div className={'bottom-line'}></div>}
        </div>
      </div>
      <div className={'conversation-info__content'}>
        {tab == 1 && <CustomerInformation/>}
        {tab == 2 && <DrawerOrderTab/>}
      </div>
    </div>
  )
}