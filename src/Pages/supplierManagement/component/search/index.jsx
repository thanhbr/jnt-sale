import React  from 'react';
import {StyledSupplierSearch} from "./_styled";
import {CONSIGNMENT} from "../../../../Component/Icons";
import {Input} from "../../../../common/form/input";
import {useSearchSupplier} from "../../hook/useSearchSupplier";
import { useSearchParams } from 'react-router-dom';

const Index = ()=>{
    const {searchSupplier} = useSearchSupplier()
    const [searchParams] = useSearchParams()
    return(
        <StyledSupplierSearch>
            <div className={'supplier-management-search'}>
                <Input
                    className="supplier-management-search-input"
                    icon={CONSIGNMENT.iconSearch}
                    placeholder={'Tìm kiếm theo Mã/Tên/SĐT nhà cung cấp'}
                    autoComplete={'false'}
                    defaultValue={searchParams.get('search')}
                    // value={value}
                    onChange={e => searchSupplier(e)}
                />

            </div>
        </StyledSupplierSearch>
    )
}

export default  Index;

