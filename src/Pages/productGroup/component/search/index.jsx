import { CONSIGNMENT } from "Component/Icons";
import { useProductSearch } from "Pages/productGroup/hook/useProductSearch";
import { ProductGroup } from "Pages/productGroup/provider/_context";
import React from "react";
import { useContext } from "react";
import { StyledProductGroupSearch } from "./_styled";

const Index = () => {
    const { pageState, pageDispatch } = useContext(ProductGroup)

    const {handleSearch} = useProductSearch(pageState, pageDispatch)
    return (
        <StyledProductGroupSearch>
            <div className={"product-group-search"}>
                <div className="product-group-search-content">
                    <input id='product-group-search-input'
                        placeholder='Tìm kiếm theo Mã/Tên nhóm sản phẩm'
                        className='product-group-search-input'
                        value={pageState.search}
                        onChange={handleSearch}
                    />
                    <span className='product-group-search__iconSearch'>{CONSIGNMENT.iconSearch}</span>
                </div>
            </div>
        </StyledProductGroupSearch>
    )
}
export default Index;