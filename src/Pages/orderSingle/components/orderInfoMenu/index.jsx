import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {StyledOrderSingleCustomerInfoOrderInfoMenu} from './_styled'

export const OrderSingleCustomerInfoOrderInfoMenu = ({
  extraData,
  onClose,
  ...props
}) => {
  return (
    <StyledOrderSingleCustomerInfoOrderInfoMenu {...props}>
      {extraData.map(item => (
        <div
          key={item?.id}
          className="order-single-customer-info-order-info-menu__item"
          style={item?.onClick ? {cursor: 'pointer'} : null}
          onClick={item?.onClick}
        >
          <Tooltip placement="bottom" title={item?.containerTooltip || ''}>
            <Text
              color={!!item?.onClick ? THEME_SEMANTICS.delivering : undefined}
            >
              {item?.name || '---'} {item?.value}{' '}
              {!!item?.tooltip && (
                <Tooltip placement="bottom" title={item.tooltip}>
                  <i
                    style={{
                      marginLeft: 4,
                      display: 'inline-block',
                      transform: 'translateY(4px)',
                    }}
                  >
                    {ORDER_SINGLE_ICONS.question}
                  </i>
                </Tooltip>
              )}
            </Text>
          </Tooltip>
        </div>
      ))}
    </StyledOrderSingleCustomerInfoOrderInfoMenu>
  )
}
