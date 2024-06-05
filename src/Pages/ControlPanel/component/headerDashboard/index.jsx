import { Button, ButtonGroup } from '@mui/material'
import { Grid } from '@material-ui/core'
import React from 'react'
import "./index.scss"
import { format } from "date-fns"
import clsx from 'clsx'
import { ftoDate } from '../../../../util/formatTime'
import { useTranslation } from 'react-i18next'

export default ({ ...props }) => {
  const dateStart =new Date(props.data.date_start);
  const dateEnd =new Date(props.data.date_end);
  const daysStart=ftoDate(dateStart.getDay()+1);
  const daysEnd=ftoDate(dateEnd.getDay()+1);

  const { t } = useTranslation()

  return (
    <Grid
      className="control-panel-col-1"
      container
      xs={12}
      sm={12}
      md={9}
    >
      <Grid className="header-dashboard" item xs={12} sm={12} md={12}>
        <div className="header-block">
          <p className="title-header">{t('overview')}</p>
          <div className="content-filter">
            <span className="text-filter">{daysStart}, {format(new Date(props.data.date_start), 'dd/MM/yyyy')} - {daysEnd}, {format(new Date(props.data.date_end), 'dd/MM/yyyy')}</span>
            <ButtonGroup className="btn-filter" color="success" disableElevation variant="outlined" aria-label="outlined button group">
              <Button className={clsx("btn-7-days",{
                active: props.data.day == 7
              })} onClick={() => props.changeFilter(7)}>7 {t('day')}</Button>
              <Button className={clsx("btn-15-days",{
                active: props.data.day == 15
              })} onClick={() => props.changeFilter(15)}>15 {t('day')}</Button>
            </ButtonGroup>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}