import React from "react";
import {AlternativeAutoComplete} from "../../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {useUpdateStoreConfig} from "../../../../hook/useUpdateStoreConfig";
import {Option} from "../../../../../../common/form/autoComplete/_option";
import {STORE_CONFIG_PRINT_TEMPLATE} from "../../../../account";

const Index = ({...props})=>{
    const {
        bulkOrder,
        storeFunction,
    }=useUpdateStoreConfig()
    const {activeValue, list, keyword} = bulkOrder
    return(
        <AlternativeAutoComplete
            className="store-config__input-wide"
            // main input
            inputProps={{
                categoryList: [], // menu list in category dropdown
                categoryValue: {name: '', value: ''}, // if not exist this value -> default category: categoryList[0]
                categoryWidth: 125,
                categoryHidden: true,
                placeholder: 'Chọn mẫu đơn in',
                readOnly: true,
                value: activeValue?.name || '',
            }}
            menuProps={{
                empty: list.length <= 0 ? 'Không tìm thấy mẫu đơn in' : '',
            }}
            // search input in dropdown menu
            searchInputProps={{
                placeholder: 'Tìm kiếm mẫu đơn in',
                value: keyword,
                onChange: storeFunction.onKeywordChange,
            }}
        >
            {list.length > 0 &&
            list.map(item => (
                <Option
                    key={item.value}
                    className="store-config__option-text"
                    data-active={item.value === activeValue?.value}
                    onClick={() => storeFunction.onChangBulkOrder(item,props.isUpdate)}
                >
                    {item.name}
                </Option>
            ))}

        </AlternativeAutoComplete>
    )
}

export default Index;