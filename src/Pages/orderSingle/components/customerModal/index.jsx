import {Input} from 'common/form/input'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import StringUtils from 'Pages/orderSingle/utils/string'
import {useRef, useState} from 'react'
import {StyledOrderSingleCustomerModal} from './_styled'

export const OrderSingleCustomerModal = ({
  fetching,
  list = [],
  loading,
  onClose,
  onLoadMore,
  onSelect,
  inputProps,
  ...props
}) => {
  const [loadingMore, setLoadingMore] = useState(false)

  const menu = useRef(null)

  const handleMenuScroll = () => {
    if (loading) return

    const clientHeight = menu.current.clientHeight
    const scrollHeight = menu.current.scrollHeight
    const scrollTop = menu.current.scrollTop

    if (clientHeight + scrollTop > scrollHeight - 200) {
      if (onLoadMore && !loadingMore) {
        setLoadingMore(true)
        const response = onLoadMore()
        response.then(() => setLoadingMore(false))
      }
    }
  }

  const handleItemClick = data => {
    if (onSelect && data?.data?.mobile)
      onSelect(data.data.mobile, {data: data.data, isChosen: true})
    if (onClose) onClose()
  }

  return (
    <Modal title="Chọn từ danh bạ khách hàng" width={600} onClose={onClose}>
      <StyledOrderSingleCustomerModal {...props}>
        <i className="order-single-customer-modal__close" onClick={onClose}>
          {ORDER_SINGLE_ICONS.x}
        </i>
        <Input
          {...inputProps}
          icon={inputProps?.icon || ORDER_SINGLE_ICONS.searchMd}
          placeholder={
            inputProps?.placeholder ||
            'Tìm kiếm khách hàng theo tên, điện thoại'
          }
        />
        {fetching ? (
          <div className="order-single-customer-modal__fetching">
            <Spinner size={54} thickness={5} />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </div>
        ) : (
          <div
            ref={menu}
            className="order-single-customer-modal__list common-scrollbar"
            style={{overflow: list.length <= 0 ? 'hidden' : 'auto'}}
            onScroll={handleMenuScroll}
          >
            {list.map(item => (
              <div
                key={item?.value}
                className="order-single-customer-modal__item"
                onClick={() => handleItemClick(item)}
              >
                <div className="order-single-customer-modal__avatar">
                  <Text
                    as="b"
                    color="#fff"
                    fontSize={12}
                    lineHeight={17}
                    style={{textTransform: 'uppercase'}}
                  >
                    {!!item?.name
                      ? StringUtils.getFirstLetters(item.name).substring(0, 2)
                      : '--'}
                  </Text>
                </div>
                <div className="order-single-customer-modal__info">
                  <Text className="order-single-customer-modal__name">
                    {item?.name || '---'} - {item?.data?.mobile || '---'}
                  </Text>
                  <Text color="#7C88A6">
                    {item?.data?.city_name}
                    {!!item?.data?.district_name &&
                      ` - ${item.data.district_name}`}
                    {!!item?.data?.ward_name && ` - ${item.data.ward_name}`}
                  </Text>
                </div>
              </div>
            ))}
            {list.length <= 0 && (
              <div className="order-single-customer-modal__empty">
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
                  Không tìm thấy khách hàng
                </Text>
              </div>
            )}
            {!!loading && (
              <div className="order-single-customer-modal__loading">
                <Spinner size={48} thickness={4} />
              </div>
            )}
          </div>
        )}
      </StyledOrderSingleCustomerModal>
    </Modal>
  )
}
