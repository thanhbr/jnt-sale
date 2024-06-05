import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Text } from '../text'
import CountUp from 'react-countup'
import { StyledProgress } from './styled'

export default function LinearDeterminate({
  value,
  duration=0.4,
  range = 10,
  text = true,
  textColor = '#00081D',
  textFontWeight = '600',
  textFontSize = '14px',
  textLineHeight = '140%',
  ...props
}) {

  return (
    <StyledProgress>
      <div className={'progress-main'} style={{margin: '0 24px'}}>
        <LinearProgress className={'progress-bar'} variant="determinate" value={value} {...props}/>
        {!!text && <Text className={'progress-percent'} color={textColor} fontWeight={textFontWeight} fontSize={textFontSize} lineHeight={textLineHeight}>
          <CountUp duration={duration} start={value <= range ? 0 : (value - range)} end={value}/>%</Text>}
      </div>
    </StyledProgress>
  );
}
