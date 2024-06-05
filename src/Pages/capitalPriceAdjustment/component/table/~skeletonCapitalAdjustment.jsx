import React from 'react'
import {TableCell, TableRow} from "@material-ui/core"
import Skeleton from "@mui/material/Skeleton"

const SkeletonCapitalAdjustment = () => {
  const SkelentonRows = Array.from(Array(20).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body' key={i}>
            <TableCell align="left" style={{width: '11.5rem' , padding: '8px 16px'}}>
              <Skeleton variant="text" width={110} height={20}/>
              <div style={{display: 'flex'}}>
                <Skeleton variant="text" width={80} height={20}/>
                <Skeleton variant="text" width={20} height={20} style={{marginLeft: 8}}/>
              </div>
            </TableCell>
            <TableCell align="left" style={{width: '11rem' , padding: '8px 16px'}}>
              <Skeleton variant="text" width={110} height={20}/>
            </TableCell>
            <TableCell align="left" style={{width: '18.5rem' , padding: '8px 16px'}}>
              <Skeleton variant="text" width={110} height={20}/>
            </TableCell>
            <TableCell align="left" style={{width: '7.5rem' , padding: '8px 16px', textAlign: 'center'}}>
              <Skeleton variant="text" width={110} height={20}/>
            </TableCell>
            <TableCell align="left" style={{width: '9.375rem' , padding: '8px 16px', textAlign: 'center'}}>
              <Skeleton variant="text" width={110} height={20}/>
            </TableCell>
            <TableCell align="left" style={{width: '40rem', padding: '8px 32px'}}>
              <Skeleton variant="text" width={291} height={20}/>
            </TableCell>
            <TableCell align="left" style={{width: '4rem' , padding: '8px 16px', textAlign: 'center'}}>
              <Skeleton variant="text" width={20} height={30}/>
            </TableCell>
          </TableRow>
      )}
    </>
  )
}

export default SkeletonCapitalAdjustment;