import React, {useContext} from "react";
import {StyledSupplierEmpty} from "./_styled";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import empty from "../../interfaces/image/empty.png"
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import {ICON} from "../../interfaces/_icon";
import {SupplierManagement} from "../../provider/_context";
import {useSupplierManagementAction} from "../../provider/_reducer";
const Index = ()=>{
    const  {pageState, pageDispatch} = useContext(SupplierManagement)
    const handleOpenModal = ()=>{
        pageDispatch({type:useSupplierManagementAction.OPEN_MODAL,payload:true})
    }
    const key_word=pageState.key_word
    return(
        <StyledSupplierEmpty>
            <Tr className={'supplier-management-empty'}>
                <Td className={'supplier-management-empty-td'}>
                    <div className={'supplier-management-empty_group'}>
                          <img src={empty} />
                        {key_word ?  <Text
                            as={'p'}
                            color={'#7C88A6'}
                            className={'supplier-management-empty_text'}
                        >Không tìm thấy nhà cung cấp nào.</Text>:
                            <Text
                                as={'p'}
                                color={'#7C88A6'}
                                className={'supplier-management-empty_text'}
                            >Bạn chưa có nhà cung cấp nào.</Text>
                        }
                        {!key_word &&  <Button  className={'supplier-management-empty_btn'} onClick={handleOpenModal}>
                            {ICON.plus}
                            Tạo mới nhà cung cấp
                        </Button>}

                    </div>
                </Td>
            </Tr>
        </StyledSupplierEmpty>
    )
}
export default Index;