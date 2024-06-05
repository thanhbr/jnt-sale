import React from 'react';
import { TableCell, TableRow } from "@material-ui/core";
import Skeleton from '@mui/material/Skeleton';
import "./Skeleton.scss"
export default function SkeletoComponent({ ...props }) {
  const SkelentonRows = Array.from(Array(props.numb).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body' key={i}>
            <TableCell align="center" className='table_checkbox'>
              <Skeleton variant="rectangular" width={15} height={15}/>
            </TableCell>
            <TableCell align="left" className='table_consignment'>
              <Skeleton variant="text"  />
            </TableCell>
            <TableCell align="left" className='table_phone'>
              <Skeleton variant="text"  />
            </TableCell>
            <TableCell align="left" className='table_address'>
              <Skeleton variant="text"  />
              <Skeleton variant="text"  />
            </TableCell>
            <TableCell className='table_status'>
              <Skeleton variant="text"  />
            </TableCell>
            <TableCell className='table_setting'>
              <Skeleton variant="text"  />
            </TableCell>
          </TableRow>
      )}
    </>
  )
}
