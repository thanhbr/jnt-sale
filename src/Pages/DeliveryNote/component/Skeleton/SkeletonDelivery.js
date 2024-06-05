import React from 'react'
import { TableCell, TableRow } from "@material-ui/core";
import { Skeleton } from '@mui/material';
import { Tr } from 'layouts/tableLayout/_tr';
import { Td } from 'layouts/tableLayout/_td';
export default function SkeletonDelivery({...props}) {
    const SkelentonRows = Array.from(Array(props.numb).keys())
    return (
      <>
        {SkelentonRows.map(
          (i) =>
            <Tr key={i} className='table__delivery-row'>
              <Td className='table__delivery-checkbox'>
                <Skeleton variant="rectangular" width={15} height={15}/>
              </Td>
              <Td className='table__delivery-note'>
                <Skeleton variant="rectangular" width={612} />
              </Td>
              <Td className='table__delivery-date'>
                <Skeleton variant="text" width={612}/>
              </Td>
              <Td className='table__delivery-status'>
                <Skeleton variant="text" width={300}/>
              </Td>
              <Td className='table__delivery-option'>
                <Skeleton variant="text" width={36}/>
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
