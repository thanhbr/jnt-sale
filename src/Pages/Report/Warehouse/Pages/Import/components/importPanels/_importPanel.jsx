import {Text} from 'common/text'
import {Tooltip} from 'common/tooltip'
import {ORDER_ICONS} from 'Pages/Report/Warehouse/Pages/Import/interfaces/_icons'
import styled from 'styled-components'
import CountUp from 'react-countup'

export const ImportPanel = ({
  currency,
  title,
  titleTooltip,
  value,
  ...props
}) => {
  return (
    <StyledImportPanel {...props}>
      <div className="import-panel__heading">
        <Text color="#7C88A6">{title}</Text>
        {titleTooltip && (
          <Tooltip title={titleTooltip}>{ORDER_ICONS.question}</Tooltip>
        )}
      </div>
      <Text as="h4" fontSize={16} lineHeight={22}>
        <CountUp start={0} end={value} duration={1} separator="," /> {currency}
      </Text>
    </StyledImportPanel>
  )
}

const StyledImportPanel = styled.div`
  padding: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  bimport: 1px solid #ebeef5;
  bimport-radius: 6px;

  .import-panel {
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
