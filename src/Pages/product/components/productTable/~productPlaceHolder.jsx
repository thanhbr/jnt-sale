import Skeleton from "@mui/material/Skeleton";
import React from "react";
import {TableCell, TableRow} from "@material-ui/core";

export const SkeletonProductPage = () => {
  const SkelentonRows = Array.from(Array(20).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body' key={i}>
            <TableCell align="center" className='table_checkbox' style={{width: '50px'}}>
              <Skeleton variant="rectangular" width={18} height={18}/>
            </TableCell>
            <TableCell align="left" style={{width: '68%'}}>
              <div style={{display: 'flex'}}>
                <Skeleton variant="rectangular" width={44} height={44}/>
                <div style={{marginLeft: '12px'}}>
                  <Skeleton variant="text" width={'27.8125rem'} height={40}/>
                </div>
              </div>
            </TableCell>
            <TableCell align="left" style={{width: '15%'}}>
              <Skeleton variant="text" width={129} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '15%'}}>
              <Skeleton variant="text" width={129} height={40}/>
            </TableCell>
            <TableCell align="left" style={{width: '15rem'}}>
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