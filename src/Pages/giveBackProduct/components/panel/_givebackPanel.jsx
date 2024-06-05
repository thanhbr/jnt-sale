import {Text} from "../../../../common/text";
import {Tooltip} from "../../../../common/tooltip";
import CountUp from "react-countup";
import styled from "styled-components";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";

export const GivebackProductPanel = ({
                             currency,
                             title,
                             titleTooltip,
                             value,
                             ...props
                           }) => {
  return (
    <StyledGivebackProductPanel {...props}>
      <div className="order-panel__heading">
        <Text color="#7C88A6">{title}</Text>
        {titleTooltip && (
          <Tooltip title={titleTooltip}>{GIVEBACK_PRODUCT_ICONS.question}</Tooltip>
        )}
      </div>
      <Text as="h4" fontSize={16} lineHeight={22}>
        <CountUp start={0} end={value} duration={1} separator="," /> {currency}
      </Text>
    </StyledGivebackProductPanel>
  )
}

const StyledGivebackProductPanel = styled.div`
  padding: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid #ebeef5;
  border-radius: 6px;

  .order-panel {
    &__heading {
      margin-bottom: 4px;

      display: flex;
      align-items: center;

      svg {
        width: 16px;
        height: 16px;
        margin-left: 4px;

        transform: translateY(2px);
      }
    }
  }
`
