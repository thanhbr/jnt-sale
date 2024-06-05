import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Tooltip} from 'common/tooltip'
import {COD_ICONS} from '../../interfaces/_icons'
import styled from 'styled-components'
import CountUp from 'react-countup'

export const CodPanel = ({
  currency,
  title,
  titleTooltip,
  value,
  decimals=0,
  ...props
}) => {
  return (
    <StyledOrderPanel {...props}>
      <div className="order-panel__heading">
        <Text color="#7C88A6" fontSize={14} fontWeight={400} lineHeight={20}>
          {title}
        </Text>
        {titleTooltip && (
          <Tooltip title={titleTooltip}>{COD_ICONS.question}</Tooltip>
        )}
      </div>
      <Text
        as="h4"
        color={THEME_COLORS.secondary_100}
        fontSize={16}
        lineHeight={22}
      >
        <CountUp start={0} end={value} duration={1} separator="," decimals={decimals}/> {currency}
      </Text>
    </StyledOrderPanel>
  )
}

const StyledOrderPanel = styled.div`
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
