import CheckBoxConsignment from "Component/CheckBoxConsignment/CheckBoxConsignment";
import {Td} from "layouts/tableLayout/_td";
import {Tr} from "layouts/tableLayout/_tr";
import {PRODUCT_HEADER_TITLE} from "Pages/productGroup/interface";
import React, {useState} from "react";
import {Text} from 'common/text'
import styled from "styled-components";
import {useProductCheckbox} from "Pages/productGroup/hook/useProductCheckbox";
import {useContext} from "react";
import {ProductGroup} from "Pages/productGroup/provider/_context";
import {Button} from "common/button";
import {ORDER_ICONS} from "Pages/refactorOrder/interfaces/_icons";
import {StyledProductTableHeader} from "./_styled";

const Index = () => {
    const list = PRODUCT_HEADER_TITLE
    const {pageState, pageDispatch} = useContext(ProductGroup)
    const {checkAll, handleActive, shouldActiveCheckbox} = useProductCheckbox()
    const [open, setOpen] = useState(false)
    const data = pageState.listCategory
    const show = () => {
        if (list) {
            return list.map((item, index) => {
                return (
                    <Td key={index} className={'product-group-table-header-' + item.class}>
                        <Text fontWeight={600}>
                            {item.name}
                        </Text>
                    </Td>
                )
            })
        }
    }
    const checkFullPageChecked = () => {
        let checkFullPage = true
        data?.forEach(item => {
            const findItem = pageState.is_check?.find(find => find === item.id)
            if (!!!findItem) checkFullPage = false
        })
        return checkFullPage
    }
    return (
        <StyledProductTableHeader>
            <div className={"product-group-table-header"}>
                <Tr type='tHead'>
                    <Td className='product-group-table-header-checkbox'>
                        <CheckBoxConsignment
                            isChecked={shouldActiveCheckbox}
                            handleClick={checkAll}
                            minus={!checkFullPageChecked()}
                        />
                    </Td>
                    {pageState.is_check.length == 0 ? <>{show()}</> :

                        <Td className="product-group-table-header__cell" data-selected="true" data-type="th">
                            <Text as="b">
                                {pageState.is_check.length > 9
                                    ? pageState.is_check.length
                                    : `0${pageState.is_check.length}`}{' '}
                                 nhóm sản phẩm được chọn
                            </Text>
                            <div className="product-group-table-header__selected-action-dropdown">
                                <Button
                                    className="product-group-table-header__selected-action-toggle"
                                    size="xs"
                                    onClick={() => setOpen(true)}
                                >
                                    Thao tác {ORDER_ICONS.caretRight}
                                </Button>
                                {open && (
                                    <>
                                        <div
                                            className="product-group-table-header__selected-action-backdrop"
                                            onClick={() => setOpen(false)}
                                        ></div>
                                        <ul className="product-group-table-header__selected-action-menu common-popover">
                                            <li
                                                className="product-group-table-header__selected-action-menu-item"
                                                onClick={() => {
                                                    setOpen(false)
                                                    handleActive({id: pageState.is_check, status: 1})
                                                }}
                                            >
                                                Kích hoạt
                                            </li>
                                            <li
                                                className="product-group-table-header__selected-action-menu-item"
                                                onClick={() => {
                                                    setOpen(false)
                                                    handleActive({id: pageState.is_check, status: -1})
                                                }}
                                            >
                                                Ngưng sử dụng
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>
                        </Td>
                    }

                </Tr>
            </div>

        </StyledProductTableHeader>


    )
}
export default Index;
