import React from 'react'
import {TableCell, TableRow} from "@material-ui/core"
import Skeleton from "@mui/material/Skeleton"

const PlaceholderTable = () => {
  const SkelentonRows = Array.from(Array(10).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body' key={i}>
            <TableCell align="center" className='table_checkbox' style={{width: '50px'}}>
              <Skeleton variant="rectangular" width={18} height={18}/>
            </TableCell>
            <TableCell align="left" style={{width: '12.5rem'}}>
              <Skeleton variant="text" width={'10rem'} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '18.75rem'}}>
              <Skeleton variant="text" width={'10rem'} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '57.5rem'}}>
              <Skeleton variant="text" width={'10rem'} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '6.5rem'}}>
              <Skeleton variant="text" width={60} height={40}/>
            </TableCell>
            <TableCell align="left">
              <Skeleton variant="rectangular" width={18} height={18}/>
            </TableCell>
          </TableRow>
      )}
    </>
  )
}

export default PlaceholderTable;