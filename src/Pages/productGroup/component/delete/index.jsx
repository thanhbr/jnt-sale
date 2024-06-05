import {Box, Modal} from '@material-ui/core';
import {Button} from 'common/button';
import {Text} from 'common/text';
import {useDeleteproduct} from 'Pages/productGroup/hook/useDeleteProduct';
import {ProductGroup} from 'Pages/productGroup/provider/_context';
import {useProductAction} from 'Pages/productGroup/provider/_reducer';
import React from 'react';
import {useContext} from 'react';
import "./index.scss";

const Index = () => {
    const {pageState, pageDispatch} = useContext(ProductGroup)
    const handleCloseConfirm = () => {
        pageDispatch({type: useProductAction.CHECK_CONFIRM_DELETE, payload: !pageState.check_confirm_delete})
        pageDispatch({type: useProductAction.GET_ID, payload: ''})
    }
    const {handleDelete} = useDeleteproduct()
    return (
        <Modal
            open={pageState.check_confirm_delete}
            onClose={handleCloseConfirm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="product-group">
                <Text
                    as="p"
                    fontSize={20}
                    fontWeight={600}
                    lineHeight={28}
                    className='product-group_title'
                >Xóa nhóm sản phẩm</Text>
                <Text as="p"
                      lineHeight={19}
                      className='product-group_text'
                >
                    Nhóm sản phẩm sau khi xoá sẽ không thể khôi phục. Trường hợp nếu thực hiện xóa nhóm sản phẩm cha,
                    các nhóm sản phẩm con cũng sẽ đồng thời bị xóa đi.
                </Text>
                <Text
                    as="p"
                    lineHeight={19}
                    className='product-group_text'
                >
                    Bạn có chắc chắn muốn xoá nhóm sản phẩm đã chọn?
                </Text>

                <div className='product-group_button'>
                    <Button className='product-group_cancel' appearance='ghost'
                            onClick={handleCloseConfirm}>Hủy</Button>
                    <Button className='product-group_acept' badgeType='danger' onClick={handleDelete}>Xóa</Button>
                </div>
            </Box>

        </Modal>
    )
}
export default Index;