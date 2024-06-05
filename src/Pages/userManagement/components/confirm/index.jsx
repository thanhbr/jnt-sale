import { Box, Modal } from "@material-ui/core";
import { Button } from "common/button";
import { Text } from "common/text";
import useGlobalContext from "containerContext/storeContext";
import { useConfirm } from "Pages/userManagement/hooks/useConfirm";
import { useTableBody } from "Pages/userManagement/hooks/useTableBody";
import { MODAL_CONFIRM } from "Pages/userManagement/interfaces/detailcontant";
import { UserManagementContext } from "Pages/userManagement/provider/_context";
import { userManagementActions } from "Pages/userManagement/provider/_reducer";
import React from "react";
import { useContext } from "react";
import "./index.scss"
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const Index = () => {
  const {t} = useTranslation()
    const { pageState, pageDispatch } = useContext(UserManagementContext)
    const list = MODAL_CONFIRM
    const { id_confirm } = pageState.open_confirm
    const {setActive} = useTableBody()
    const {handleResetPassword} = useConfirm()
    const [GlobalState,] = useGlobalContext()
  const userIdGlobal = GlobalState.user.user_id
    const handleCloseConfirm = () => {
        pageDispatch({ type: userManagementActions.OPEN_CONFIRM, payload: { open: false, id_confirm: '' } })
        pageDispatch({ type: userManagementActions.IS_CHECK, payload: [] })
        pageDispatch({type:userManagementActions.DISABLE_BUTTON,payload:false})
    }
    let ArrTemp = []
    const handleApply = (action)=>{
        switch (action) {
            case 1:
                pageState.isCheck?.map(item => {
                    if( item !== userIdGlobal)  ArrTemp.push(item)
                })
                setActive({id:ArrTemp,status:2})
                handleCloseConfirm()
                break;
        
            case 2:
                handleResetPassword()
                handleCloseConfirm()
                break;
        
            default:
                break;
        }
    }

    const show = () => {
        return list?.map((item, index) => {
            if (item.id === id_confirm) {
                return (
                    <Box key={index} className="user-management-confirm" >
                        <Text
                            as="p"
                            fontSize={20}
                            fontWeight={600}
                            lineHeight={28}
                            className='user-management-confirm_title'
                        >{t(item.title)}</Text>
                        <Text
                            as="p"
                            lineHeight={19}
                            className='user-management-confirm_text'
                        >
                            {t(item.content)}
                        </Text>

                        <div className='user-management-confirm_button'>
                            <Button className='user-management-confirm_cancel' appearance='ghost' onClick={handleCloseConfirm}>{t(DISPLAY_NAME_MENU.GENERAL.CANCEL)}</Button>
                            <Button className='user-management-confirm_acept' onClick={()=>handleApply(item.id)}>{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM)}</Button>
                        </div>
                    </Box>
                )
            }
        })

    }
    return (
        <Modal
            open={pageState.open_confirm.open}
            onClose={handleCloseConfirm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                {show()}
            </>

        </Modal >
    )
}
export default Index