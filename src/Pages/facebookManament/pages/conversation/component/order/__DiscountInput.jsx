import {CurrencyInput} from 'common/form/input/_currencyInput'
import {Popper} from 'common/popper'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Tooltip} from 'common/tooltip'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useState} from 'react'
import {formatMoney} from 'util/functionUtil'

export const DiscountInput = ({
  discountPrice,
  typeValue,
  warning,
  onTypeChange,
  ...props
}) => {
  const [isOpenType, setIsOpenType] = useState(false)
  const [triggerDefault, setTriggerDefault] = useState(false)

  const handleTypeChange = (val, {onClose}) => {
    onTypeChange(val)
    onClose()
    setIsOpenType(false)
    setTriggerDefault(!triggerDefault)
  }

  return (
    <Tooltip
      className="--danger"
      placement="bottom"
      title={warning && !isOpenType ? 'Mức giảm giá cần ≤ Tổng tiền' : ''}
    >
      <CurrencyInput
        {...props}
        icon={
          <Popper
            renderPopper={({onClose}) => (
              <div className="product-table__discount-type-dropdown-menu">
                {typeValue !== 'đ' && (
                  <div
                    className="product-table__discount-type-dropdown-menu-item"
                    style={{
                      color: THEME_COLORS.secondary_100,
                      textDecoration: 'underline',
                    }}
                    onClick={() => handleTypeChange('đ', {onClose})}
                  >
                    đ
                  </div>
                )}
                {typeValue !== '%' && (
                  <div
                    className="product-table__discount-type-dropdown-menu-item"
                    style={{color: THEME_COLORS.secondary_100}}
                    onClick={() => handleTypeChange('%', {onClose})}
                  >
                    %
                  </div>
                )}
              </div>
            )}
            renderToggle={({open}) => (
              <div className="product-table__discount-type-dropdown-toggle">
                <Text as="b" color={THEME_COLORS.primary_300}>
                  {typeValue}{' '}
                  <i data-active={open}>{ORDER_SINGLE_ICONS.caretUp}</i>
                </Text>
              </div>
            )}
            popperProps={{style: {padding: '4px 0'}}}
          />
        }
        triggerDefault={triggerDefault}
        validateText={
          typeValue === '%' && discountPrice && !isNaN(discountPrice) ? (
            `Giảm ${formatMoney(Math.max(discountPrice, 0))}`
          ) : warning ? (
            <></>
          ) : (
            ''
          )
        }
        validateProps={{style: {fontSize: 12, lineHeight: '17px'}}}
        validateType={warning ? 'danger' : 'defaultSuccess'}
        style={{zIndex: 1, ...props?.style}}
        onIconClick={() => setIsOpenType(true)}
      />
    </Tooltip>
  )
}
