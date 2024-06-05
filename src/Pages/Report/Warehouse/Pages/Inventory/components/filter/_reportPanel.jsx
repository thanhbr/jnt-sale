import {Text} from "../../../../../../../common/text";
import {Tooltip} from "../../../../../../../common/tooltip";
import {ORDER_ICONS} from "../../../../../../refactorOrder/interfaces/_icons";
import CountUp from "react-countup";
import styled from "styled-components";

export const ReportPanel = ({
                             currency,
                             title,
                             titleTooltip,
                             value,
                             ...props
                           }) => {
  return (
    <StyledReportPanel {...props}>
      <div className="order-panel__heading">
        <Text color="#7C88A6">{title}</Text>
        {titleTooltip && (
          <Tooltip title={titleTooltip}>{ORDER_ICONS.question}</Tooltip>
        )}
      </div>
      <Text as="h4" fontSize={16} lineHeight={22}>
        <CountUp start={0} end={value} duration={1} separator="," /> {currency}
      </Text>
    </StyledReportPanel>
  )
}

const StyledReportPanel = styled.div`
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
