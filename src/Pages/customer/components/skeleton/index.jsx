import { TableCell, TableRow } from '@material-ui/core'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

export const CustomerSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body' key={i}>
            <TableCell align="center" className='table_checkbox'>
              <Skeleton variant="rectangular" width={18} height={18}/>
            </TableCell>
            <TableCell align="left" style={{width: '12rem'}}>
              <Skeleton variant="text" width={215} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '15rem'}}>
              <Skeleton variant="text" width={195} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '14.5rem'}}>
              <Skeleton variant="text" width={195} height={40} />
            </TableCell>
            <TableCell align="left" style={{width: '9rem'}}>
              <Skeleton variant="text" width={70} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '23.5rem'}}>
              <Skeleton variant="text" height={40}/>
            </TableCell>
            <TableCell align="left" style={{paddingLeft: '9rem'}}>
              <Skeleton variant="rectangular" width={60} height={20}/>
            </TableCell>
            <TableCell align="right" className='table_setting'>
              <Skeleton variant="rectangular" width={18} height={18}/>
            </TableCell>
          </TableRow>
      )}
    </>
  )
}