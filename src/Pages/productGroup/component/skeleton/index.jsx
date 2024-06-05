import { Skeleton } from '@mui/material'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import React from 'react'

export default function index({...props}) {
    const SkelentonRows = Array.from(Array(props.numb).keys())
    return (
      <>
        {SkelentonRows.map(
          (i) =>
            <Tr key={i} className='product-group-table-body'>
              <Td className='product-group-table-body-checkbox'>
                <Skeleton variant="rectangular" width={15} height={15}/>
              </Td>
              <Td className='product-group-table-body-name'>
                <Skeleton variant="rectangular" width={220} />
              </Td>
              <Td className='product-group-table-body-name'>
                <Skeleton variant="text" width={220}/>
              </Td>
              <Td className='product-group-table-body-note'>
                <Skeleton variant="text" width={780}/>
              </Td>
              <Td className='product-group-table-body-status'>
                <Skeleton variant="text" width={220}/>
              </Td>
              <Td className='product-group-table-body-setting'>
                <Skeleton variant="text" width={15}/>
              </Td>
             
            </Tr>
        )}
      </>
    )
}
