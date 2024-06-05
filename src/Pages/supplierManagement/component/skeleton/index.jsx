import React from "react";
import {StyledSupplierSkeleton} from "./_styled";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Skeleton} from "@mui/material";

const Index = ({...props})=>{
    const SkelentonRows = Array.from(Array(props.numb).keys())
    return(
        <StyledSupplierSkeleton>
            {SkelentonRows.map(
                (i) =>
                    <Tr key={i} className='supplier-management-table-body'>
                        <Td className='supplier-management-table-body-checkbox'>
                            <Skeleton variant="rectangular" width={15} height={15}/>
                        </Td>
                        <Td className='supplier-management-table_code-supplier'>
                            <Skeleton variant="text" width={155} />
                        </Td>
                        <Td className='supplier-management-table_name-supplier'>
                            <Skeleton variant="text" width={240}/>
                        </Td>
                        <Td className='supplier-management-table_address-supplier'>
                            <Skeleton variant="text" width={440}/>
                        </Td>
                        <Td className='supplier-management-table_phone-supplier'>
                            <Skeleton variant="text" width={120}/>
                        </Td>
                        <Td className='supplier-management-table_note-supplier'>
                            <Skeleton variant="text" width={322}/>
                        </Td>
                        <Td className='supplier-management-table_status-supplier'>
                            <Skeleton variant="text" width={115}/>
                        </Td>
                        <Td className='supplier-management-table_setting-supplier'>
                            <Skeleton variant="text" width={115}/>
                        </Td>

                    </Tr>
            )}
        </StyledSupplierSkeleton>
    )
}
export default  Index