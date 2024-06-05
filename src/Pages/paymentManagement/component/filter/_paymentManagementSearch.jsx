import React, {useEffect} from 'react';
import {Input} from "../../../../common/form/input";
import {useSearchParams} from "react-router-dom";
import usePaymentManagementFilter from "../../hooks/usePaymentManagementFilter";
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";

const PaymentSearch = () => {
    const {search} = usePaymentManagementFilter()
    const [searchParams] = useSearchParams()

    return (
        <Input
            className={"product-filter-form__input-wide"}
            icon={ORDER_ICONS.searchMd}
            placeholder={'Tìm kiếm theo mã phiếu chi'}
            value={search.value}
            defaultValue={searchParams.get('search')}
            onChange={(e)=>search.onChange(e.target.value)}
            style={{maxWidth: '24.5rem'}}
        />
    )
}

export default PaymentSearch;