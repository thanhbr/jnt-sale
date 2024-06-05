import React from "react";
import { StyledCreatePaymentType } from "./_styled";
import NameOfPaymentType from "./_nameOfPaymentType";
import CodeOfPaymentType from "./_codeOfPaymentType";
import DescriptionOPaymentType from "./_descriptionOfPaymentType";
import StatusOfPaymentType from "./_statusOfPaymentType"
const Index = _ =>{
    return(
        <StyledCreatePaymentType>
            <NameOfPaymentType/>
            <CodeOfPaymentType/>
            <DescriptionOPaymentType/>
            <StatusOfPaymentType/>
        </StyledCreatePaymentType>
    )
}
export default Index