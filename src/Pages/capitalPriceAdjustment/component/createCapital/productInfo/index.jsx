import React from "react";
import {CapitalProductSearchList} from "./_productSearchList";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import {ORDER_SINGLE_ICONS} from "../../../../orderSingle/interface/_icons";
import {useCreateCapitalAdjustment} from "../../../hooks/useCreateCapitalAdjustment";
import {CapitalProductTable} from "./_productTable";

const Index = ()=>{
    const {methods, data} = useCreateCapitalAdjustment()
    const {list, canLoadMore, loading, value, selectedList, validate} = data
    const handleWithInventorySearchProductListScroll = _ => {
        if (!canLoadMore) return
        methods.onWithInventorySearchFetchMoreProductList()

    }
    const handleCapitalPrice = (val,data) =>{
        let currentValue = val.toString().replace(/[^0-9]/g, '')
        if(currentValue <= 99999999) methods.onSelectedProduct(data, {type: 'amount', amount: currentValue})

    }
    const handleDeleteProduct = (data)=>{
        methods.onSelectedProduct(data, {type:'decrease', amount: 0})
    }
    const handleBlurCapital = (data,value) =>{
        methods.onHandleBlurCapital(data,value)
    }
    return(
        <div>
            <Input
                dropdown={
                    list.length > 0
                        ? ({onClose}) => (
                            <CapitalProductSearchList
                                data={list}
                                inventory={true}
                                isExistOriginData={true}
                                isLoading={loading}
                                isLoadMore={!canLoadMore}
                                onClose={onClose}
                                onSelect={methods.onSelectedProduct}
                                selectedList={selectedList}
                            />
                        )
                        : () => (
                            <div style={{textAlign:'center',height:'272px'}} className="order-single-product-info-inventory-container__not-found">
                                <img src="/img/product/empty.png" alt="Empty" />
                                <Text as={'p'} fontWeight={600} color={'#7C88A6'} style={{width:'100%'}}>
                                    {value.trim()
                                        ? 'Không tìm thấy sản phẩm nào'
                                        : 'Chưa có sản phẩm nào'}
                                </Text>
                            </div>
                        )
                }
                dropdownProps={{
                    canLoadMore : canLoadMore,
                    onLoadMore: handleWithInventorySearchProductListScroll,
                }}
                icon={ORDER_SINGLE_ICONS.searchMd}
                placeholder="Tìm sản phẩm"
                onChange={e => methods.onWithInventorySearchChange(e.target.value)}
                heightContent={344}
            />
            <div style={{height:'auto',marginBottom:'24px'}}>
                <CapitalProductTable
                    inventory={true}
                    list={selectedList.selected}
                    onQuantityChange={handleCapitalPrice}
                    onDeleteProduct = {handleDeleteProduct}
                    validate={validate}
                    onBlurCapital={handleBlurCapital}
                />
            </div>

        </div>
    )
}
export default Index;