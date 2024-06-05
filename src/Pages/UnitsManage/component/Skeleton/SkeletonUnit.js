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
            <Tr key={i} className='table__unit-row'>
              <Td className='table__unit-checkbox'>
                <Skeleton variant="rectangular" width={15} height={15}/>
              </Td>
              <Td className='table__unit-note'>
                <Skeleton variant="rectangular" width={'100%'} />
              </Td>
              <Td className='table__unit-date'>
                <Skeleton variant="text" width={'100%'}/>
              </Td>
              <Td className='table__unit-status'>
                <Skeleton variant="text" width={'100%'}/>
              </Td>
              <Td className='table__unit-option'>
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
