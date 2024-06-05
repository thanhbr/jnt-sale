import {StyledUserManagmentSkeleton} from "../../../userManagement/components/~styled";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
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
            <TableCell align="left" style={{width: '12rem'}}>
              <Skeleton variant="text" width={1300} height={20}/>
            </TableCell>
            <TableCell align="left" style={{paddingLeft: '3rem'}}>
              <Skeleton variant="text" width={80} height={20}/>
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