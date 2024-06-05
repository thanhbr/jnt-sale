import React from 'react'
import { TableCell, TableRow } from "@material-ui/core";
import { Skeleton } from '@mui/material';
import { Tr } from 'layouts/tableLayout/_tr';
import { Td } from 'layouts/tableLayout/_td';
export default function SkeletonUnit({...props}) {
    const SkelentonRows = Array.from(Array(props.numb).keys())
    return (
      <>
        {SkelentonRows.map(
          (i) =>
            <Tr key={i} className='table__warehouse-manager-row'>
              <Td className='table__warehouse-manager-note'>
                <Skeleton variant="rectangular" width="100%" />
              </Td>
              <Td className='table__warehouse-manager-date'>
                <Skeleton variant="rectangular" width="100%" />
              </Td>
              <Td className='table__warehouse-manager-note'>
                <Skeleton variant="rectangular" width="100%" />
              </Td>
              <Td className='table__warehouse-manager-note'>
                <Skeleton variant="rectangular" width="100%" />
              </Td>
              <Td className='table__warehouse-manager-note'>
                <Skeleton variant="text" width="100%"/>
              </Td>
              <Td className='table__warehouse-manager-status'>
                <Skeleton variant="text" width={300}/>
              </Td>
              <Td className='table__warehouse-manager-option'>
                <Skeleton variant="text" width={36}/>
              </Td>
             
              {/* <TableCell className='table_setting'>
                <Skeleton variant="text"  />
              </TableCell> */}
            </Tr>
        )}
      </>
    )
}
