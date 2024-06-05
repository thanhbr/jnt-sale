import { TableCell, TableRow } from '@material-ui/core'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import { CustomToolTip } from '../../../../Component/tooltip/CustomTooltip'
import { formatMoney } from '../../../../util/functionUtil'

export const OrderSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <TableRow className='table_body' key={i}>
            <TableCell id="table-header">
              <input type={'checkbox'}/>
            </TableCell>
            <TableCell component="th" scope="row" >
              <div className="">
                <Skeleton variant="text" width={143} height={23}/>
                <Skeleton variant="text" width={143} height={23}/>
              </div>
            </TableCell>
            <TableCell align="left" className="" >
              <div className="">
                <div className="font-bold capitalize" style={{color: '#1A94FF'}}>
                  <Skeleton variant="text" width={125} height={23}/>
                </div>
                <div><Skeleton variant="text" width={125} height={23}/></div>
              </div>
            </TableCell>
            <TableCell align="left" ><Skeleton variant="text" height={23}/></TableCell>
            <TableCell align="left" >
              <div className="!flex !items-center">
                <Skeleton variant="text" height={23} width={120}/>
              </div>
            </TableCell>
            <TableCell align="right" ><Skeleton variant="text" height={23}/></TableCell>
            <TableCell align="right" ><Skeleton variant="text" height={23}/></TableCell>
            <TableCell align="center" id='row-order'>
              <Skeleton variant="text" height={23}/>
            </TableCell>
            <TableCell align="right" style={{ width:'150px' }} >
              <div className="table-detail">
                <span className="inline-block text-xs">
              <img src={'/svg/Manipulation.svg'} alt="Manipulation" />
            </span>
              </div>
            </TableCell>
          </TableRow>
      )}
    </>
  )
}