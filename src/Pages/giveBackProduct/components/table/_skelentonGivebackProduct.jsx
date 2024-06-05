import React from 'react';
import Skeleton from "@mui/material/Skeleton";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Tr} from "../../../../layouts/tableLayout/_tr";

const SkelentonGivebackProduct =  ({...props}) => {
  const SkelentonRows = Array.from(Array(props.numb).keys())
  return (
    <>
      {SkelentonRows.map((i) =>
        <div className={'giveback-product-skeleton'} key={i}>
          <Tr>
            <Td style={{display: 'block', paddingLeft: 24, width: 200}}>
              <div>
                <Skeleton variant="text" width={98} height={30} />
              </div>
              <div style={{display:'flex'}}>
                <Skeleton variant="rectangular" width={20} height={20} style={{marginRight: 8}}/>
                <Skeleton variant="rectangular" width={64} height={20} />
              </div>
            </Td>
            <Td style={{paddingLeft: 24, width: 180}}>
              <Skeleton variant="text" width={90} height={30} />
            </Td>
            <Td style={{paddingLeft: 24, width: 260}}>
              <Skeleton variant="text" width={170} height={30} />
            </Td>
            <Td style={{paddingLeft: 24, width: 200}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{paddingLeft: 24, width: 160}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{paddingLeft: 24, width: 100}}>
              <Skeleton variant="rectangular" width={20} height={20} />
            </Td>
            <Td style={{paddingLeft: 24, width: 470}}>
              <Skeleton variant="text" width={171} height={30} />
            </Td>
            <Td>
              <Skeleton variant="rectangular" width={20} height={20} />
            </Td>
          </Tr>
        </div>)}
    </>
  )
}

export default SkelentonGivebackProduct