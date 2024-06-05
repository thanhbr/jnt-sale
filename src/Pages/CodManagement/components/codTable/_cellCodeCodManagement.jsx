import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import { Tooltip } from 'common/tooltip'
import { CustomToolTip } from 'Component/tooltip/CustomTooltip'
import {COD_ICONS} from '../../interfaces/_icons'
import styled from 'styled-components'
import {useTranslation} from "react-i18next";

export const CellCodeOrder = ({id, inventory, time, ...props}) => {
  const { t } = useTranslation()
  return (
    <StyledCellCodeOrder {...props}>
      
      {id && ( 
        <div className="cell-code-delivery__upper">
          <Tooltip  placement="top-start"
            title={id}>
            <Text
              className="cell-code-delivery__id"
              color={THEME_COLORS.secondary_100}
              fontSize={14}
              fontWeight={600}
              lineHeight={20}
            >
              <span>{id.length <= 12 ? id : id.substring(0, 12)+' ...'}</span>
            </Text>
          </Tooltip>
        </div>
      )}
      {time && (
        <div className="cell-code-delivery__under">
          <CustomToolTip placement="bottom" title={t("order_date_sended")}>
            {COD_ICONS.clock}
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
