import { TableCell, TableRow } from '@material-ui/core'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

export const CustomerSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body_customer' key={i}>
            <TableCell align="center" className='table_checkbox'   style={{ height:'66px' }}>
                <input type={'checkbox'}/>
            </TableCell>
            <TableCell align="left" className='customer-code-rows'  style={{ width:'300px' }}>
              <Skeleton variant="text" height={23}/>
            </TableCell>
            <TableCell align="left" className='customer-address-rows'  style={{ width:'700px' }} >
              <Skeleton variant="text" height={23}/>
            </TableCell>
            <TableCell align="left" className='customer-status-rows'>
              <Skeleton variant="text" height={23}/>
            </TableCell>
            <TableCell align="right" className='table_setting'>
              <Skeleton variant="text" height={23}/>
            </TableCell>
          </TableRow>
      )}
    </>
  )
}