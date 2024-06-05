import React from 'react';
import {Tr} from "../../../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../../../layouts/tableLayout/_td";
import Skeleton from "@mui/material/Skeleton";

const Selenton = () => {
  const SkelentonRows = Array.from(Array(10).keys())
  return (
    <>
      {SkelentonRows.map((i) =>
        <div className={'giveback-product-skeleton'} key={i}>
          <Tr>
            <Td style={{padding: '6px 0 0 16px', width: 48, height: 64}}>
              <Skeleton variant="rectangular" width={20} height={20} style={{marginRight: 8}}/>
            </Td>
            <Td style={{display: 'block', padding: '6px 0 0 16px', width: 700, height: 64}}>
              <div>
                <Skeleton variant="text" width={98} height={30} />
              </div>
              <div style={{display:'flex'}}>
                <Skeleton variant="rectangular" width={164} height={20} />
              </div>
            </Td>
            <Td style={{width: 300, height: 64}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{width: 75, height: 64}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{width: 100, height: 64}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{width: 200, height: 64, paddingLeft: 100}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{width: 200, height: 64, paddingLeft: 100}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
          </Tr>
        </div>)}
    </>
  )
}

export default Selenton