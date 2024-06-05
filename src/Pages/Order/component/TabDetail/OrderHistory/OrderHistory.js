import {Button} from '../../../../../common/button'
import {formatMoney} from '../../../../../util/functionUtil'
import {fDateTimeSuffix} from '../../../../../util/formatTime'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import {useState} from 'react'
import {ICONS} from '../../../_icon'
import './OrderHistory.scss'

export const OrderHistory = ({orderDetail}) => {
  const orderLog = orderDetail.order_logs
  return (
    <Box sx={{maxWidth: 400}}>
      <Stepper activeStep={0} orientation="vertical">
        {orderLog.map((step, index) => (
          <Step key={index}>
            <StepLabel
              icon={
                index == 0
                  ? ICONS.history_active
                  : ICONS.history
              }
              className="step-label"
            >
              {step.user_name} đã <b>{step.type}</b>
            </StepLabel>
            <StepContent>
              <Typography className="step-content">
                <div className="oder-history-step">
                  <div className="flex">{ICONS.clock}</div>
                  <p>{fDateTimeSuffix(step.dt_created)}</p>
                </div>
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
