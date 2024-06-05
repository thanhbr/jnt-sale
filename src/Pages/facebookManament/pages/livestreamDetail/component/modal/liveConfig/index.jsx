import React from 'react';
import {RightSightPopup} from "../../../../../../../layouts/rightSightPopup";
import styled from "styled-components";
import useLiveStreamConfig from "../../../hooks/useLiveStreamConfig";
import TagComment from "./tagComment";
import TabScript from "./tagScript";
import { ConfirmModal } from 'Pages/facebookManament/common/confirm';
import { Text } from 'common/text';

const LiveStreamConfig = () => {
  const {methods, data} = useLiveStreamConfig()
  return (
    <>
      <RightSightPopup openModal={data?.configLiveStream?.openModal}
                      confirmBeforeClose={true}
                      clickClose={methods.handleOpenConfigLiveStream}
                      // disableSubmit={submit.checkBeforeSubmit}
                      // animationClose={animate}
                        className={'fb-right-sight__popup'}
                      body={[
                        {
                          item: (
                            <StyledLiveStreamConfig>
                              <div className={'live-stream-tag-toggle'}>
                                <div className={`live-stream-tag__config ${data?.configLiveStream?.activeTag === 'tagScript' && 'live-stream-tag__config--active'}`}
                                      onClick={() => methods?.handleChangeTagConfig('tagComment')}
                                >
                                  <p className={'live-stream-tag__config-title'}>Cấu hình bình luận</p>
                                  <p className={'live-stream-tag__config-sub-title'}>Cài đặt điều kiện ẩn/in bình luận</p>
                                  {data?.configLiveStream?.activeTag === 'tagComment' && <div style={{borderTop: '2px solid', marginTop: 16, width: 48}}> </div>}
                                </div>
                                <div className={`live-stream-tag__config ${data?.configLiveStream?.activeTag === 'tagComment' && 'live-stream-tag__config--active'}`}
                                      onClick={() => methods?.handleChangeTagConfig('tagScript')}
                                >
                                  <p className={'live-stream-tag__config-title'}>Cấu hình kịch bản</p>
                                  <p className={'live-stream-tag__config-sub-title'}>Cài đặt kịch bản lên đơn, phản hồi tự động</p>
                                  {data?.configLiveStream?.activeTag === 'tagScript' && <div style={{borderTop: '2px solid', marginTop: 16, width: 48}}> </div>}
                                </div>
                              </div>

                              {data?.configLiveStream?.activeTag === 'tagComment' ? (<TagComment />) : (<TabScript />)}


                            </StyledLiveStreamConfig>
                          ),
                        }
                      ]}
                      footer={
                        {
                          cancel: {
                            width: 74,
                            title: 'Huỷ'
                          },
                          save: {
                            width: 110,
                            title: 'Cập nhật'
                          },
                        }
                      }
                      acceptance={methods.handleSubmit}
      />
      <ConfirmModal
          openModal={data.configLiveStream.confirmStatus}
          body={<Confirm />}
          stylePopup={'product-group-modal_confirm'}
          footer={
              {
                  cancel: {
                      width: 110,
                      title: 'Huỷ',
                      
                  },
                  acceptance: {
                      width: 110,
                      title: 'Xác nhận'
                  },
              }
          }
          footerProps={
              {className:'product-group-modal_dismiss'} 
          }
          closeModal={methods?.handleCancelConfirm}
          acceptance={methods?.handleAcceptConfirm}
      />
    </>
  );
};

const Confirm = () => {
  return (
      <div>
          <Text
              fontSize={19}
              fontWeight={600}
          >Xác nhận rời khỏi trang</Text>
          <Text as='p' className='product-group-modal_txt'>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
      </div>

  )
}

export default LiveStreamConfig


const StyledLiveStreamConfig = styled.div`
  .live-stream-tag {
    &-toggle {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      background: #EFF3FB;
    }
    &__config {
      color: #1E9A98;
      width: 15.625rem;
      background: white;
      padding: 16px 16px 0 16px;
      cursor: pointer;
      
      &-title {
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
      }
      &-sub-title {
        font-weight: 400;
        font-size: 12px;
      }
    }
    &__config--active {
      width: 15.625rem;
      cursor: pointer;
      padding: 16px;
      background: #EFF3FB;
      border: none;
    
      .live-stream-tag__config-title {
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        color: #00081D;
      }
      .live-stream-tag__config-sub-title {
        color: #7C88A6;
        font-weight: 400;
        font-size: 12px;
      }
    }
    &__auto-config {
      display: flex;
      justify-content: space-between;
      margin: 72px 0 24px 0;
      
      &--title {
        font-weight: 600 !important;
        font-size: 15px !important;
      }
    }
    &__wrapper-option {
      display: flex;
      margin-bottom: 16px;
      cursor: pointer;
      
      &--title {
        margin-left: 8px;
      }
    }
    &__setting-print {
      margin-top: 24px;
      &--header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        &_right{
          display: flex;
          align-items: center;
        }
      }
      &--notify-success {
        display: flex;
        align-items: center;
        margin-top: 16px;
        background: rgba(0, 171, 86, 0.1);
        border: 1px solid #00AB56;
        border-radius: 6px;
        padding: 9px 16px;
        span{
          margin-left: 6px;
        }
      }
      &--notify-error {
        display: flex;
        align-items: center;
        margin-top: 16px;
        background: rgba(255, 85, 85, 0.1);
        border: 1px solid #FF5555;
        border-radius: 6px;
        padding: 9px 16px;
        span{
          margin-left: 6px;
        }
      }
    }
    &__setting-height {
      margin-top: 24px;
    }
    &__setting-area {
      margin-top: 24px;
      height: 116px;
    }
    &__auto-print-phone {
      display: flex;  
      margin-top: 24px;
      
      &--title {
        margin-left: 8px;
        resize: none;
      }
    }
    @media screen and (max-width: 1440px) {
      &__auto-print-phone {
        margin-bottom: 42px;
      }
    }
    
    &__script-config {
      margin: 72px 0 24px 0;
      display: flex;
      justify-content: space-between;
      &--title {
        display: flex;
        p {
          margin-right: 8px;
          font-weight: 600;
          font-size: 15px;
        }
        svg {
          cursor: pointer;
        }
      }
      &--btn-detail span {
        color: #0088FF;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        width: fit-content;
        margin-right: 8px;
      }
      &--action {
        position: relative;
        .live-stream-tag__script-config-menu {
          position: absolute;
          top: 32px;
          right: 0;
          z-index: 1;
          overflow: scroll;
          
          width: 258px;
          max-height: 224px;
          padding: 8px;
          background: #ffffff;
          box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          
          li {
            padding: 8px;
            color: #191d32;
            font-size: 13px;
            font-weight: 400;
            line-height: 20px;
            transition: color 0.25s;
            cursor: pointer;
          }
          
          &-item--text {
            &:hover {
              color: rgb(229, 16, 29) !important;
            }
          }
        }
      }
      &--btn-list {
        border-radius: 60px;
        margin-left: 8px;
        font-weight: 400;
      }
      &--post-order {
        margin-top: 24px;
        min-height: 10.375rem;
        border: 1px dashed #EBEEF5;
        border-radius: 6px;
        padding: 12px 36px;
        text-align: center;
        
        &-title {
          font-weight: 400;
          font-size: 13px;
          color: #7C88A6;
          line-height: 140%;
        }
        &-sub-title {
          font-weight: 600 !important;
          font-size: 13px !important;
          color: rgb(229, 16, 29) !important;
          cursor: pointer;
        }
      }
      &-feedback {
        margin-top: 24px;
        display: flex;
        &-title {
          margin-right: 8px;
          font-weight: 600;
          font-size: 15px;
        }
        svg {
          cursor: pointer;
        }
      }
      &--print-order {
        margin-top: 24px;
        min-height: 10.375rem;
        border: 1px dashed #EBEEF5;
        border-radius: 6px;
        padding: 12px 48px;
        text-align: center;
        &-title {
          font-weight: 400;
          font-size: 13px;
        }
        &-sub-title {
          font-weight: 600 !important;
          font-size: 13px !important;
          color: rgb(229, 16, 29) !important;
          cursor: pointer;
        }
      }
      &--btn-detail {
        margin-top: 8px;
        cursor: pointer;
        display: flex;
        justify-content: end;
        svg {
          margin-top: 6px;
        }
      }
      &--title-active {
        color: #0088FF !important;
        cursor: pointer;
      }
      &--title-change {
        margin-top: 32px;
        font-weight: 400;
        font-size: 13px;
        font-style: italic;
      }
      &--note {
        list-style: disc;
        font-weight: 400;
        font-size: 13px;
        font-style: italic;
        li {
          margin-left: 24px;
          font-style: italic;
        }
      }
      &--option {
        margin-top: 16px;
        cursor: pointer;
      }
      &--option-text {
        .live-stream-tag__script-config--option-status-title {
            font-weight: 400;
            font-size: 12px;
            color: --var(primary-color);
        }
        .live-stream-tag__script-config--option-status {
            color: #7C88A6 !important;
            font-style: italic !important;
            font-weight: 400;
            font-size: 12px !important;
        }
      }
      &--option-text-active {
        .live-stream-tag__script-config--option-status-title {
          font-weight: 400;
          font-size: 13px;
          color: --var(primary-color);
        }
        .live-stream-tag__script-config--option-status {
            color: red !important;
            font-style: italic !important;
            font-weight: 400;
            font-size: 12px !important;
        }
        .live-stream-tag__script-config--option-status-name {
          font-style: italic !important;
          font-weight: 400 !important;
          font-size: 12px !important;
        }
      }
      &--option-status--not-active {
        font-style: italic !important;
        font-weight: 400 !important;
        font-size: 12px !important;
        color: #7C88A6 !important;
      }
    }
  }
`
