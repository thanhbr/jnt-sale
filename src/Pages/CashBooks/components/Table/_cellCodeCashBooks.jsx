import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import { Tooltip } from 'common/tooltipv2'
import { CustomToolTip } from 'Component/tooltip/CustomTooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'
import {CASHBOOKS_LINK_CODE} from "../../interfaces/_constants";

export const CellCode = ({id, time, type, ...props}) => {
  return (
    <StyledCellCode {...props}>
      {id && (
        <div className="cell-code-delivery__upper">
          <Tooltip className={"delivery_code"} placement="top" title={id} baseOn="width">
            <Text
              className="cell-code-delivery__id"
              color={THEME_SEMANTICS.delivering}
              fontSize={14}
              fontWeight={600}
              lineHeight={20}
              as={'a'}
              href={CASHBOOKS_LINK_CODE(+type, id)}
              target={'blank'}
            >
             {id}
            </Text>
          </Tooltip>
        </div>
      )}
      {time && (
        <div className="cell-code-delivery__under">
          <CustomToolTip placement="bottom" title="Ngày tạo phiếu">
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
    </StyledCellCode>
  )
}

const StyledCellCode = styled.div`
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
      width: 140px;
      .delivery_code{
        width: auto;
        padding: 0;
        overflow: hidden;
        position: relative;
        display: inline-block;
        margin-right: 6px;
        text-decoration: none;
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
