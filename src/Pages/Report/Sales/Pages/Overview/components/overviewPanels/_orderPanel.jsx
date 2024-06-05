import { Text } from 'common/text'
import { Tooltip } from 'common/tooltip'
import styled from 'styled-components'
import CountUp from 'react-countup'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { Skeleton } from '@mui/material'
import React from 'react'

export const OrderPanel = ({
  currency,
  title,
  titleTooltip,
  value,
  loading,
  active,
  ...props
}) => {
  return (
    <StyledOrderPanel {...props}>
      {!!loading ?
        <>
          <div className="order-panel__heading">
            <Skeleton variant="text" width={100} height={20}/>
          </div>
          <Skeleton variant="text" width={158} height={28}/>
        </>
        :
        <>
          <div className="order-panel__heading">
            <Text color="#7C88A6">{title}</Text>
            {titleTooltip && (
              <Tooltip placement={'bottom-start'} title={titleTooltip}>{REPORT_SALE_ICONS.question}</Tooltip>
            )}
          </div>
          <Text as="h4" fontSize={16} lineHeight={22}>
            <CountUp start={0} end={value} duration={1} separator=","/> {currency}
          </Text>
        </>
      }
    </StyledOrderPanel>
  )
}

const StyledOrderPanel = styled.div`
  padding: 8px;

  //border: 1px solid #ebeef5;
  //border-radius: 6px;

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
