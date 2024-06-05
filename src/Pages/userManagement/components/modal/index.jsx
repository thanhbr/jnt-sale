import React, {memo, useContext} from 'react';
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {UserManagementContext} from "../../provider/_context";
import {Grid} from "@mui/material";
import {Checkbox} from "../../../../common/form/checkbox";
import {Tooltip} from "../../../../common/tooltip";
import {USER_ICON} from "../../icon/icon";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {useModal} from "../../hooks/useModal";
import './~style.scss'
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Text} from "../../../../common/text";

export const ModalUserManagement = memo(() => {
  const { pageState } = useContext(UserManagementContext)
  const {groupEmployee, functions, valueForm, validate} = useModal()

  return (
    <>
     <RightSightPopup
       openModal={pageState.modalUserInfo}
       confirmBeforeClose={true}
       disableSubmit={validate?.canSubmitRule}
       clickClose={() => functions.onCloseModalUserRole()}
       animationClose={functions.closeModalRole}
       header={
         {
           title: 'Phân quyền người dùng',
           subTitle: '“Cho phép phân quyền nhân viên theo vai trò người dùng đã thiết lập”',
         }
       }
       body={[
         {
           item: (<>
             <div className={"right-sight-popup__group-role--header"}>
               {validate?.errorCheckRules?.status && <span className={"right-sight-popup__group-role--error"}>{validate?.errorCheckRules?.message}</span>}
               <p className={"right-sight-popup__group-role--title"}>Chọn một trong các vai trò <Text color={THEME_SEMANTICS.failed}>*</Text></p>
             </div>
             <Grid container className={"right-sight-popup__group-role"}>
               {groupEmployee?.list?.map(item => (
                 <Grid xs={6} sm={6} md={6} lg={6} item
                       key={item.id}>
                   <div
                     className={"right-sight-popup__group-role--list"}
                     onClick={() => functions.onChangeRule(item.id)}
                     style={{display: 'flex', marginTop: '24px'}}
                   >
                     <Checkbox
                       checked={valueForm?.rules.includes(item.id)}
                     />
                     <span className={'right-sight-popup__group-role--text'}>{item.group_name}</span>
                     <Tooltip placement="bottom" title={item.group_comment || 'Chưa có mô tả'}>
              <span
                style={{
                  marginLeft: 6,
                  display: 'inline-block',
                  transform: 'translateY(2px)',
                }}
              >
                {USER_ICON.question}
              </span>
                     </Tooltip>
                   </div>
                 </Grid>
               ))}
             </Grid>
           </>)
         }
       ]}
       footer={
         {
           cancel: {
             width: 74,
             title: 'Huỷ'
           },
           save: {
             width: 110,
             title: 'Lưu'
           },
         }
       }
       acceptance={() => functions.onSubmitRule()}
     />
     <ConfirmModal
       openModal={pageState.modalConfirmUserRole}
       body={<p>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</p>}
       footer={
         {
           cancel: {
             width: 74,
             title: 'Huỷ'
           },
           acceptance: {
             width: 110,
             title: 'Xác nhận'
           },
         }
       }
       closeModal={() => functions.closeModalRoleConfirm()}
       acceptance={() => functions.acceptanceModalRoleConfirm()}
     />
    </>
  );
})