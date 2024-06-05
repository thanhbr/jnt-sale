import {Td} from "layouts/tableLayout/_td";
import {Tr} from "layouts/tableLayout/_tr";

import React from "react";
import {StyleProductGroupEmpty} from "./_styled";
import empty_pic from "../../interface/product_empty.png"
import {Text} from "common/text";
import {PRODUCT_GROUP_EMPTY} from "Pages/productGroup/interface";
import {Button} from "common/button";
import {PRODUCT_GROUP_ICON} from "Pages/productGroup/interface/icon";
import {useProductAction} from "Pages/productGroup/provider/_reducer";
import {useContext} from "react";
import {ProductGroup} from "Pages/productGroup/provider/_context";

const Index = () => {
    const {pageState, pageDispatch} = useContext(ProductGroup)
    return (
        <StyleProductGroupEmpty>
            <div className={'product-group-empty'}>
                <Tr className='product-group-empty_tr'>
                    <Td className='product-group-empty_content'>
                        <div className="product-group-empty_item">
                            <img src={empty_pic}/>
                            <Text
                                as='p'
                                color={'#7C88A6'}
                                className='product-group-empty_text'
                            >{pageState.search !== '' ?PRODUCT_GROUP_EMPTY.NONE_PRODUCT:PRODUCT_GROUP_EMPTY.EMPTY_PRODUCT}</Text>
                            {pageState.search !== '' ?'':<Button icon={PRODUCT_GROUP_ICON.plus} onClick={() => pageDispatch({
                                    type: useProductAction.OPEN_MODAL,
                                    payload: !pageState.open_modal
                                })}>Tạo mới nhóm sản phẩm</Button>}

                        </div>
                    </Td>
                </Tr>
            </div>

        </StyleProductGroupEmpty>
    )
}
export default Index;