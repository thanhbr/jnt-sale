import React, {useRef, useState} from 'react';
import {Text} from "../../../../common/text";
import {Modal} from "../../../../common/modal";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";
import {Input} from "../../../../common/form/input";
import styled from "styled-components";
import useHeaderGivebackProduct from "../../hooks/useHeaderGivebackProduct";
import {GIVEBACK_PRODUCT_MODAL_FORM_DATE_TIME_SORT_TYPES} from "../../interfaces/contants";
import {CategoryDateTimeRangePicker} from "../../../../common/form/datePicker/_categoryDateTimeRangePicker";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {formatMoney} from "../../../../util/functionUtil";
import {Radio} from "../../../../common/form/radio";
import {Tooltip} from "../../../../common/tooltip";
import {Tooltip as Tooltipv2} from "../../../../common/tooltipv2";
import {Button} from "../../../../common/button";
import {Spinner} from "../../../../common/spinner";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const ModalSelectedOrder = (...props) => {
  const {t} = useTranslation()
  const {functions, disabledDate, modalOrder} = useHeaderGivebackProduct()
  const [loadingMore, setLoadingMore] = useState(false)

  const menu = useRef(null)

  const handleMenuScroll = () => {
    // if (loading) return

    const clientHeight = menu.current.clientHeight
    const scrollHeight = menu.current.scrollHeight
    const scrollTop = menu.current.scrollTop

    if (clientHeight + scrollTop > scrollHeight - 200) {
      // if (onLoadMore && !loadingMore) {
      //   setLoadingMore(true)
      //   const response = onLoadMore()
      //   response.then(() => setLoadingMore(false))
      // }
    }
  }

  return (
    <Modal title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.SELECT_ORDER_TITLE)} width={800}
           // onClose={onClose}
    >
      <StyledGivebackProductSelectedOrderModal>
        <i className="giveback-product-select-order-modal__refresh"
           onClick={() => functions?.handleRefreshOrder()}
        >
          <Tooltip title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.UPDATE_LAST_DATA)} placement={'bottom'}>{GIVEBACK_PRODUCT_ICONS.repeat}</Tooltip>

        </i>
        <div className="giveback-product-select-order-modal__wrapper">
          <Input
            icon={GIVEBACK_PRODUCT_ICONS.searchMd}
            placeholder={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.SEARCH_CREATE)}
            className="giveback-product-select-order-modal__wrapper--search"
            onChange={e => functions.handleSearchOrder(e?.target?.value)}
          />
          <CategoryDateTimeRangePicker
            className="giveback-product-select-order-modal__wrapper--date"
            categoryList={GIVEBACK_PRODUCT_MODAL_FORM_DATE_TIME_SORT_TYPES}
            categoryWidth={105}
            value={modalOrder?.dateTime?.value}
            // triggerDefault={dateTime.triggerDefault}
            onChange={value => functions.handleChangeDatetimeOrder(value)}
            datePickerProps={{
              defaultValue: modalOrder?.dateTime?.default || '',
              disabledDate: disabledDate,
              placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
            }}
          />
        </div>
        {/*{fetching ? (*/}
        {/*  <div className="giveback-product-select-order-modal__fetching">*/}
        {/*    <Spinner size={54} thickness={5} />*/}
        {/*    <Text style={{marginTop: 5}}>Loading...</Text>*/}
        {/*  </div>*/}
        {/*) : (*/}
          <>
            <div className={'giveback-product-select-order-modal__header'}>
              <div className={'giveback-product-select-order-modal__header--cell'}>
                <Text fontWeight={600} >{t(DISPLAY_NAME_MENU.GENERAL.ODER_ID)}</Text>
              </div>
              <div className={'giveback-product-select-order-modal__header--cell'}>
                <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.DATE_CREATED)}</Text>
              </div>
              <div className={'giveback-product-select-order-modal__header--cell'}>
                <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.CUSTOMER)}</Text>
              </div>
              <div className={'giveback-product-select-order-modal__header--cell'}>
                <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.ORDER_VALUE)}</Text>
              </div>
            </div>
            <div
              ref={menu}
              className={`giveback-product-select-order-modal__list ${modalOrder?.list?.length > 5 ? 'common-scrollbar' : ''}`}
              style={{overflow: modalOrder?.list?.length <= 0 ? 'hidden' : 'auto'}}
              onScroll={handleMenuScroll}
            >
              {modalOrder?.loading && (
                <div className="giveback-product-select-order-modal__loading">
                  <Spinner
                    size={48} thickness={4} />
                </div>
              )}
              {!modalOrder?.loading && modalOrder?.list?.map(item => (
                <div key={item?.order_id}
                     className={'giveback-product-select-order-modal__body'}
                     onClick={() => functions.handleActiveOrder(item)}
                >
                  <div className={'giveback-product-select-order-modal__body--cell'}>
                    <a href={`/orders?search=${item?.order_id}`}
                       target={'blank'}>{item?.order_id}</a>
                  </div>
                  <div className={'giveback-product-select-order-modal__body--cell'}>
                    <Text>{fDateTimeSuffix(item?.created_at)}</Text>
                  </div>
                  <div className={'giveback-product-select-order-modal__body--cell'}>
                    <Tooltipv2 className='tooltip_select' title={item?.customer_name} baseOn='height' placement='top-center'>
                      <Text>{item?.customer_name}</Text>
                    </Tooltipv2>
                  </div>
                  <div className={'giveback-product-select-order-modal__body--cell'}>
                    <Text>{formatMoney(item?.total_amount)}</Text>
                  </div>
                  <div className={'giveback-product-select-order-modal__body--cell'}>
                    <Radio checked={+modalOrder?.value?.order_id === +item?.order_id}/>
                  </div>
                </div>
              ))}
              {modalOrder?.list?.length <= 0 && (
                <div className="giveback-product-select-order-modal__empty">
                  <img
                    src="/img/empty-multiple-choice.png"
                    alt="empty"
                    width={80}
                    height={80}
                    style={{
                      marginBottom: 16,
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                  <Text fontSize={13} lineHeight={18}>
                    Không tìm thấy đơn hàng
                  </Text>
                </div>
              )}
            </div>
          </>
        {/*)}*/}
        <div className={'giveback-product-select-order-modal__footer'}>
          <Button appearance={'ghost'} size={'sm'}
                  onClick={() => functions.handleToggleModalOrder()}
          >{t(DISPLAY_NAME_MENU.GENERAL.CANCEL)}</Button>
          <Button size={'sm'}
                  onClick={() => functions.handleLinkOrder()}
                  disabled={!!!modalOrder?.value?.order_id}
          >{t(DISPLAY_NAME_MENU.GENERAL.CHOOSE)}</Button>
        </div>
      </StyledGivebackProductSelectedOrderModal>
    </Modal>
  )
}

export default ModalSelectedOrder

const StyledGivebackProductSelectedOrderModal = styled.div`
  position: relative;
  
  
  .giveback-product-select-order-modal {
    &__refresh {
      position: absolute;
      top: -40px;
      right: 0;
      cursor: pointer;
    }
    &__wrapper {
      margin: 16px -8px;
      display: flex;
      flex-wrap: wrap;
      &--search {
        width: calc(49% - 16px);
        margin: 0 4px 0 8px;
      }
      &--date {
        width: calc(51% - 16px);
        margin: 0 8px 0 4px;
        & .rs-picker-toggle-clean.rs-btn-close {
          display: none;
        }
      }
    }
    &__header {
      background: #F7F9FD;
      border-width: 1px;
      border-style: solid;
      border-color: #E2EAF8;
      
      border-radius: 8px 8px 0 0;
      height: 44px;
      padding: 10px 16px;
      display: flex;
      
      &--cell:nth-child(1) {
        width: 7.8125rem;
      }
      &--cell:nth-child(2) {
        margin-left: 24px;
        width: 7.5rem;
      }
      &--cell:nth-child(3) {
        margin-left: 24px;
        width: 10rem;
      }
      &--cell:nth-child(4) {
        margin-left: 24px;
        width: 10rem;
        text-align: end;
      }
    }
    &__list {
      height: 300px;
      width: 47rem;
      overflow: auto;
      &.common-scrollbar {
        width: 47.35rem;
      }
    }
    @media (min-width: 1280px) and (max-width: 1440px) {
      &__list {
        &.common-scrollbar {
          width: 59.2rem;
        }
      }
      &__header {
        &--cell:nth-child(2) {
          width: 17rem;
        }
      }
    }
    &__body {
      height: 60px;
      border-width: 0 1px 1px 1px;
      border-style: solid;
      border-color: #E2EAF8;
      padding: 20px 16px;
      display: flex;
      cursor: pointer;
      
      &--cell:nth-child(1) {
        width: 7.8125rem;
        a {
          font-weight: 600;
          font-size: 14px;
          line-height: 140%;
          color: #1A94FF;
        }
      }
      &--cell:nth-child(2) {
        margin-left: 24px;
        width: 7.5rem;
        flex: 1;
      }
      &--cell:nth-child(3) {
        margin-left: 24px;
        width: 10rem;
      }
      &--cell:nth-child(4) {
        margin-left: 24px;
        width: 10rem;
        text-align: end;
      }
      &--cell:nth-child(5) {
        margin-left: 24px;
        width: 3.5rem;
        display: flex;
        justify-content: end;
      }
    }
    &__body:last-child {
      border-radius: 0 0 8px 8px;
    }
    &__footer {
      display: flex;
      justify-content: end;
      margin-top: 32px;
      button {
        width: 110px;
      }
      button:nth-child(1) {
        margin-right: 8px;
      }
    }
    &__empty, &__loading {
      min-height: 18.75rem;
      width: 47rem;
      display: flex;
      flex-direction: column;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      background: rgb(255, 255, 255);
      
      border-width: 0 1px 1px 1px !important;
      border-style: solid !important;
      border-color: #E2EAF8 !important;
      border-radius: 0 0 8px 8px;
      
    }
  }
`
  