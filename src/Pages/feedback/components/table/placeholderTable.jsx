import React from 'react';
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";

const PlaceholderTable = () => {
  const SkelentonRows = Array.from(Array(10).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body' key={i} style={{display: 'flex'}}>
            <TableCell align="center" style={{width: '10.625rem'}}>
              <Skeleton variant="text" width={120} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '14.375rem'}}>
              <Skeleton variant="text" width={'10rem'} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '15.625rem'}}>
              <Skeleton variant="text" width={'10rem'} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '31.5rem', flex: 1}}>
              <Skeleton variant="text" width={'24.5rem'} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '12.5rem'}}>
              <Skeleton variant="text" width={'10rem'} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '8.125rem'}}>
              <Skeleton variant="text" width={60} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '1rem'}}>
            </TableCell>
          </TableRow>
      )}
    </>
  )
}

export default PlaceholderTable;