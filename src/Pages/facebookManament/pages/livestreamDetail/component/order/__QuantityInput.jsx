import {Input} from 'common/form/input'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import styled from 'styled-components'

export const QuantityInput = ({
  data,
  quantity,
  value,
  onQuantityChange,
  handleInputChange,
  ...props
}) => {
  return (
    <StyledInput
      {...props}
      icon={
        <div className="quantity-input__number-arrow">
          <i
            onClick={() =>
              !!onQuantityChange && onQuantityChange(data, 'increase')
            }
          >
            {ORDER_SINGLE_ICONS.caretUp}
          </i>
          <i
            data-disabled={quantity <= 1}
            onClick={() =>
              quantity > 1 &&
              !!onQuantityChange &&
              onQuantityChange(data, 'decrease')
            }
          >
            {ORDER_SINGLE_ICONS.caretUp}
          </i>
        </div>
      }
      // min={0}
      type="number"
      value={value}
      onChange={handleInputChange}
      onIconClick={() => {}}
    />
  )
}

const StyledInput = styled(Input)`
  .quantity-input {
    &__number-arrow {
      position: relative;

      i {
        position: absolute;
        right: 0;

        &:nth-child(1) {
          top: calc(50% - 6px);
        }
        &:nth-child(2) {
          top: calc(50% + 6px);

          transform: rotate(180deg);
        }

        &[data-disabled='true'] {
          cursor: default;

          svg {
            color: #ebeef5;

            path {
              stroke: #ebeef5;
            }
          }
        }

        svg {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
`
