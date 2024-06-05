import React from 'react';
import { Text } from 'common/text';
import "./index.scss"
import useFacebookHideAutoComment from "../../hooks/useFacebookHideAutoComment";
import {Navigate, useLocation} from "react-router-dom";
import {Box, Modal} from "@mui/material";
import {Button} from "../../../../../../common/button";

const Index = ({...props}) => {
   const { data , methods} = useFacebookHideAutoComment()
   return (
      <>
         <Modal
            open={!!data.confirm}
            onClose={methods?.onCancelConfirmDelete}
         >
            <Box className={`confirm-popup product-group-modal_confirm`}>
               <div>
                     <div
                        className={`confirm-popup__body`}
                     >
                        <div>
                           <Text
                              fontSize={19}
                              fontWeight={600}
                           >Xác nhận rời khỏi trang</Text>
                           <Text as='p' className='product-group-modal_txt'>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
                        </div>
                     </div>
                     <div
                        className={`confirm-popup__group-btn product-group-modal_dismiss`}
                     >
                        <Button onClick={methods?.onCancelConfirmDelete}
                                appearance={'ghost'}
                                className={'confirm-popup__dismiss'}
                        >Hủy</Button>
                        <Text as={'a'} color={'#ffffff'} fontWeight={600} fontSize={'14px'} lineHeight={'140%'}  href={'/facebook'} className={'confirm-popup__save__a'}>Xác nhận</Text>
                     </div>
               </div>
            </Box>
         </Modal>
      </>

   )
}
export default Index;