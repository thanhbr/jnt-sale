import { Text } from '../../../../../../../../common/text'
import { ICON_CONVERSATION } from '../../../../interface/icon'

import styled from 'styled-components'

export const EmptyContent = () => {
  return (
    <StyledEmpty>
      <div className={'empty-content__left'}>
        <Text as={'p'} color={'#000000'} fontSize={'28px'} lineHeight={'140%'} fontWeight={600} style={{ marginBottom: '36px' }}>
          Lựa chọn 1 cuộc hội thoại để bắt đầu trải nghiệm tính năng trên evoshop
        </Text>
        <div className={'flex empty-content__left-step'}>
          <div style={{ marginRight: '8px' }}>
            {ICON_CONVERSATION.checked}
          </div>
          <div>
            <Text as={'p'} fontSize={'16px'} fontWeight={600} style={{ marginBottom: '4px' }} color={'#000000'}> Quản lý theo thời gian
              thực</Text>
            <Text as={'p'} color={'#7C88A6'}>Quản lý tin nhắn/bình luận theo thời gian thực</Text>
          </div>
        </div>
        <div className={'flex empty-content__left-step'}>
          <div style={{ marginRight: '8px' }}>
            {ICON_CONVERSATION.checked}
          </div>
          <div>
            <Text as={'p'} fontSize={'16px'} fontWeight={600} style={{ marginBottom: '4px' }} color={'#000000'}> Phân loại khách
              hàng</Text>
            <Text as={'p'} color={'#7C88A6'}>Phân chia khách hàng thành các nhóm thông qua nhãn khách hàng.</Text>
          </div>
        </div>
        <div className={'flex empty-content__left-step'}>
          <div style={{ marginRight: '8px' }}>
            {ICON_CONVERSATION.checked}
          </div>
          <div>
            <Text as={'p'} fontSize={'16px'} fontWeight={600} style={{ marginBottom: '4px' }} color={'#000000'}> Tạo đơn hàng</Text>
            <Text as={'p'} color={'#7C88A6'}>Tạo đơn hàng nhanh chóng, lưu trữ thông tin lịch sử mua hàng. </Text>
          </div>
        </div>
        <div className={'flex empty-content__left-step'} style={{ marginBottom: 0 }}>
          <div style={{ marginRight: '8px' }}>
            {ICON_CONVERSATION.checked}
          </div>
          <div>
            <Text as={'p'} fontSize={'16px'} fontWeight={600} style={{ marginBottom: '4px' }} color={'#000000'}> Quản lý hội thoại tập
              trung</Text>
            <Text as={'p'} color={'#7C88A6'}>Quản lý tập trung tin nhắn/bình luận từ nhiều Fanpage</Text>
          </div>
        </div>
      </div>
      <div className={'empty-content__right'}>
        <img src="/img/facebook/backgrount-right-content.png" alt="facebook conversation"/>
      </div>
    </StyledEmpty>
  )
}

const StyledEmpty = styled.div`
  width: 82.5%;
  background: linear-gradient(105.69deg, rgba(255, 255, 255, 0.6) 20.11%, rgba(255, 255, 255, 0) 146.85%);
  opacity: 0.8;
  backdrop-filter: blur(40px);
  border-radius: 16px;
  padding: 42px 0 42px 58px;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 457px;
  .empty-content{
      &__left{
        width: 50%;
        &-step{
          margin-bottom: 25px;
        }
      }
      &__right{
        width: 50%;
        img{
          position: absolute;
          top: 0;
          right: -80px;
          width: 50%;
        }
      }
    }
`