import React from "react";
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import {Skeleton} from "@mui/material";
import {StyledSkeletonDetail} from "./_styled";

const Index = ({...props})=>{
    const SkelentonRows = Array.from(Array(props.numb).keys())
return(
        <StyledSkeletonDetail>
    {SkelentonRows.map(
            (i) =>
                <div key={i} className='supplier-management-table-body-detail'>
                    <div className='supplier-management-table_address-supplier-detail'>
                        <Skeleton variant="text" width={440}/>
                    </div>
                    <div className='supplier-management-table_phone-supplier-detail'>
                        <Skeleton variant="text" width={120}/>
                    </div>
                    <div className='supplier-management-table_note-supplier-detail'>
                        <Skeleton variant="text" width={322}/>
                    </div>
                    <div className='supplier-management-table_status-supplier-detail'>
                        <Skeleton variant="text" width={115}/>
                    </div>
                    <div className='supplier-management-table_setting-supplier-detail'>
                        <Skeleton variant="text" width={115}/>
                    </div>
                </div>
        )}
</StyledSkeletonDetail>
)
}
export default Index;