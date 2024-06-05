import {Text} from 'common/text'
import {StyledOrderSingleDeliveryNoteList} from './_styled'

export const OrderSingleDeliveryNoteList = ({
  data,
  isExistOriginData,
  value,
  onClose,
  onSelect,
  ...props
}) => {
  const handleSelect = opt => {
    if (onClose) onClose()

    if (onSelect)
      onSelect(opt.content)
  }
  return (
    <StyledOrderSingleDeliveryNoteList {...props}>
      <div className="order-single-delivery-list__list">
        {data.map(item => (
          <div
            key={item?.id}
            className="order-single-delivery-list__item"
            onClick={() => handleSelect(item)}
          >
            <div className="order-single-delivery-list__info">
              <Text as="div">{item?.content}</Text>
            </div>
          </div>
        ))}
        {/*<Text color={'#0052ff'} style={{width: '100%'}} as={'a'} href={'#'} className={'btn-create-delivery-note'}>Thêm mẫu ghi chú giao hàng</Text>*/}
      </div>
    </StyledOrderSingleDeliveryNoteList>
  )
}
