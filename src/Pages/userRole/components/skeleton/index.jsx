import {Skeleton} from "@mui/material";
import React from "react";
import {TableCell, TableRow} from "@material-ui/core";

const Index = ({ ...props }) => {
  const SkelentonRows = Array.from(Array(props.numb).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body' key={i}>
            <TableCell align="center" className='table_checkbox'>
              <Skeleton variant="rectangular" width={18} height={18}/>
            </TableCell>
            <TableCell align="left" style={{width: '5rem'}}>
              <Skeleton variant="text" width={260} height={20}/>
            </TableCell>
            <TableCell align="left" style={{width: '1.5rem'}}>
              <Skeleton variant="text" width={150} height={20}/>
            </TableCell>
            <TableCell align="left" style={{width: '1.5rem'}}>
              <Skeleton variant="text" width={120} height={20}/>
            </TableCell>
            <TableCell align="left" style={{width: '1.5rem'}}>
              <Skeleton variant="text" width={850} height={20}/>
            </TableCell>
            <TableCell align="right" style={{paddingLeft: '3rem'}}>
              <Skeleton variant="text" width={18} height={18}/>
            </TableCell>
          </TableRow>
      )}
    </>
  )

}
export default Index;