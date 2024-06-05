import React from 'react'
import {Input} from "../../../../common/form/input";
import {CONSIGNMENT} from "../../../../Component/Icons";
import styled from "styled-components";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";
const Index = _ =>{
    const {changeSearch} = usePaymentTypeModal()
    return(
        <StyledPaymentTypeSearch>
            <Input
                className="payment-type-search-input"
                icon={CONSIGNMENT.iconSearch}
                placeholder={'Tìm kiếm theo mã/tên loại phiếu chi'}
                autoComplete={'false'}
                onChange={e => changeSearch.searchPayment(e)}
            />
        </StyledPaymentTypeSearch>

    )
}
export default Index
const StyledPaymentTypeSearch = styled.div`
      width: 392px;
      height: 34px;
      background: #FFFFFF;
    //.payment-type-search{
    //  width: 392px;
    //  height: 34px;
    //  background: #FFFFFF;
    //  
    //}

`