import { Skeleton } from "@mui/material";
import { Td } from "layouts/tableLayout/_td";
import { Tr } from "layouts/tableLayout/_tr";
import React from "react";
import { StyledUserManagmentSkeleton } from "../~styled";
const Index = ({ ...props }) => {
    const SkelentonRows = Array.from(Array(props.numb).keys())
    return (
        <StyledUserManagmentSkeleton>
            {SkelentonRows.map((i) => <div className={'user-managment-skeleton'}>
                <Tr>
                    <Td className="user-managment-skeleton_checkbox" >
                        <Skeleton width={'100%'} />
                    </Td>
                    <Td className="user-managment-skeleton_fullName" >
                        <Skeleton  width={'100%'} />
                    </Td>
                    <Td className="user-managment-skeleton_phone">
                        <Skeleton  width={'100%'} />
                    </Td>
                    <Td className="user-managment-skeleton_email" >
                        <Skeleton  width={'100%'} />
                    </Td>
                    <Td className="user-managment-skeleton_managment">
                        <Skeleton  width={'100%'} />
                    </Td>
                    <Td className="user-managment-skeleton_status">
                        <Skeleton  width={'100%'} />
                    </Td>
                    <Td className="user-managment-skeleton_setting">
                        <Skeleton  width={'100%'} />
                    </Td>
                </Tr>
            </div>)}

        </StyledUserManagmentSkeleton>

    )

}
export default Index;