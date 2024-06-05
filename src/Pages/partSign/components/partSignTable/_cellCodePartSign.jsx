import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import { Tooltip } from 'common/tooltipv2'
import { CustomToolTip } from 'Component/tooltip/CustomTooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'

export const CellCodeOrder = ({id, inventory, time, ...props}) => {
  return (
    <StyledCellCodeOrder {...props}>
      {id && (
        <div className="cell-code-partSign__upper">
          <Tooltip className={"delivery_code"} placement="top" title={id} baseOn="width">
            <Text
              className="cell-code-partSign__id"
              color={THEME_COLORS.secondary_100}
              fontSize={14}
              fontWeight={600}
              lineHeight={20}
            >
              {id}
            </Text>
          </Tooltip>
        </div>
      )}
      {time && (
        <div className="cell-code-partSign__under">
          <CustomToolTip placement="bottom" title="Ngày gửi đơn">
            {ORDER_ICONS.clock}
          </CustomToolTip>
          <Text
            className="cell-code-partSigny__time"
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
  .cell-code-partSign {
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
      display: flex;
      
      .delivery_code{
        width: 230px;
        padding: 0;
         overflow: hidden;
+        position: relative;
+        display: inline-block;
+        margin: 0 5px 0 5px;
+        text-align: center;
+        text-decoration: none;
         text-overflow: ellipsis;
         white-space: nowrap;
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
