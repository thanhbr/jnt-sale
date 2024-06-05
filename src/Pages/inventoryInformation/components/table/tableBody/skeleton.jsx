import { Skeleton } from "@mui/material";
import { Td } from "layouts/tableLayout/_td";
import { Tr } from "layouts/tableLayout/_tr";
import React from "react";

const InventoryInfoSkeleton = ({ ...props }) => {
  const SkelentonRows = Array.from(Array(props.numb).keys())
  return (
    <>
      {SkelentonRows.map((i) => <div className={'user-managment-skeleton'}>
        <Tr>
          <Td style={{width: '14.375rem', marginLeft: '1.5rem'}} >
            <Skeleton width={'38px'} height={'38px'} variant="rectangular" style={{marginRight: 16}}/>
            <div>
              <Skeleton width={'8rem'} />
              <Skeleton width={'4rem'} />
            </div>
          </Td>
          <Td style={{width: '43.375rem', marginLeft: '1.5rem'}}>
            <Skeleton width={'9rem'} />
          </Td>
          <Td style={{width: '12.5rem', marginLeft: '1.5rem', textAlign: 'center'}}>
            <Skeleton  width={'7.5rem'} />
          </Td>
          <Td style={{width: '12.5rem', marginLeft: '1.5rem', textAlign: 'center'}}>
            <Skeleton  width={'7.5rem'} />
          </Td>
          <Td style={{width: '12.5rem', marginLeft: '1.5rem', textAlign: 'center'}}>
            <Skeleton  width={'7.5rem'} />
          </Td>
        </Tr>
      </div>)}

    </>

  )

}
export default InventoryInfoSkeleton