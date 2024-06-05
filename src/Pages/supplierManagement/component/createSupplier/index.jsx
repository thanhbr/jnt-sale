import React, {useContext} from "react";
import {StyledCreateSupplier} from "./_styled";
import {SupplierManagement} from "../../provider/_context";
import CodeSupplier from './_codeSupplier';
import NameSupplier from "./_nameSupplier";
import AddressSupplier from "./_addressSupplier";
import PhoneAndShortName from './_phoneAndShortname';
import ContractName from "./_contractName";
import Email from "./_emailSupplier";
import NoteSupplier from "./_noteSupplier"
import {SwitchStatus} from "../../../../Component/SwitchStatus/SwitchStatus";
import {Text} from "../../../../common/text";
import {useCreateSupplier} from "../../hook/useCreateSupplier";
const Index = ({...props})=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {function_create}=useCreateSupplier()
    const {status} = function_create
    const { onChangeStatus} = status
    return(
        <StyledCreateSupplier>
           <CodeSupplier/>
           <NameSupplier/>
           <AddressSupplier/>
           <PhoneAndShortName/>
           <ContractName/>
           <Email/>
           <NoteSupplier/>
           <div className={'supplier-management-create_status'}>
               <SwitchStatus status={pageState.supplier.status} handleChange={onChangeStatus}/>
               <Text className={'supplier-management-create_status-txt'}>Kích hoạt/Ngưng sử dụng</Text>
           </div>

        </StyledCreateSupplier>
    )
}
export default Index