import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import { Tooltip } from 'common/tooltip'
import { CustomToolTip } from 'Component/tooltip/CustomTooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'

export const CellCodeOrder = ({id, inventory, time, ...props}) => {
  return (
    <StyledCellCodeOrder {...props}>
      {id && (
        <div className="cell-code-delivery__upper">
          <Tooltip className={"delivery_code"} placement="top" title={id} baseOn="width">
            <Text
              className="cell-code-delivery__id"
              color={THEME_COLORS.secondary_100}
              fontSize={14}
              fontWeight={600}
              lineHeight={20}
            >
              {id}
            </Text>
          </Tooltip>
          <CustomToolTip
            placement="bottom"
            title={
              inventory == 1
                ? 'Đơn hàng có khấu trừ tồn kho'
                : 'Đơn hàng không khấu trừ tồn kho'
            }
          >
            {inventory == 1 ? ORDER_ICONS.inventory : ORDER_ICONS.inventoryDanger}
          </CustomToolTip>
        </div>
      )}
      {time && (
        <div className="cell-code-delivery__under">
          <CustomToolTip placement="bottom" title="Ngày cập nhật">
            {ORDER_ICONS.clock}
          </CustomToolTip>
          <Text
            className="cell-code-delivery__time"
            color="#7C88A6"
            fontSize={13}
            fontWeight={400}
            lineHeight={18}
          >
            {time}
          </Text>
        </div>
      )}
    </StyledCellCodeOrder>
  )
}

const StyledCellCodeOrder = styled.div`
  .cell-code-delivery {
    &__upper,
    &__under {
      display: flex;
      align-items: center;

      svg {
        width: 16px;
        height: 16px;

        cursor: pointer;
      }
    }
    &__upper {
      .delivery_code{
        width: 108px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
    }

    &__id {
      // margin-right: 4px;
    }

    &__time {
      margin-left: 4px;
    }
  }
`
