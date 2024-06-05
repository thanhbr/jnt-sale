import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import { Tooltip } from 'common/tooltipv2'
import { CustomToolTip } from 'Component/tooltip/CustomTooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'
import {useTranslation} from "react-i18next";

export const CellCodeOrder = ({id, inventory, time, ...props}) => {
  const { t } = useTranslation()
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
              inventory === 1
                ? t("order_deducted_from_inventory")
                : t("order_not_deducted_from_inventory")
            }
          >
            <div style={{ display: 'flex' }}>{inventory === 1 ? ORDER_ICONS.inventory : ORDER_ICONS.inventoryDanger}</div>
          </CustomToolTip>
        </div>
      )}
      {time && (
        <div className="cell-code-delivery__under">
          <CustomToolTip placement="bottom" title={t("date_created_ticket")}>
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
