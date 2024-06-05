import {Grid} from "@mui/material";
import {Input} from "../../../../../../common/form/input";
import {Text} from "../../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../../common/theme/_semantics";
import {Checkbox} from "../../../../../../common/form/checkbox";
import React, {useContext} from "react";
import styled from "styled-components";
import {PaymentManagementContext} from "../../../../provider/context";
import {useCreatePaymentModal} from "../../hooks/useCreatePaymentModal";
import {SwitchStatus} from "../../../../../../Component/SwitchStatus/SwitchStatus";
import {Switch} from "../../../../../../common/switch";

export const CreatePaymentMethods = ()=>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {form, validate, addNew} = formCreate;
    const {paymentMethods} = addNew
    const {functions} = useCreatePaymentModal()
    return(
        <StyledModalPaymentMethod>
            <div className={"right-sight-popup__group-role--header"}>
                <Grid container>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                        <div className={"right-sight-popup__group-payment-method"}>
                            <Input
                                label={
                                    <>
                                        Phương thức thanh toán <Text color={THEME_SEMANTICS.failed}>*</Text>
                                    </>
                                }
                                placeholder="Nhập tên phương thức thanh toán"
                                maxLength={50}
                                value={paymentMethods?.name}
                                validateText={validate?.paymentMethodsName?.status ? validate?.paymentMethodsName?.message : null}
                                validateType={!validate?.paymentMethodsName?.status ? 'success' : 'danger'}
                                onChange={e => functions.paymentFunction.onChangeName(e.target.value)}
                                onBlur={() => functions.paymentFunction.onBlurName()}
                            />
                        </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                        <div className={"right-sight-popup__default-payment-method"} onClick={(e) => functions.paymentFunction?.checkBoxPaymentMethod(e)}>
                            <Checkbox
                                checked={+paymentMethods?.is_active === 1 ? true : false}
                            />
                            <span>Là phương thức thanh toán mặc định</span>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                        <div  style={{marginTop:'32px',display:'flex',alignItems:'center',fontSize:'13px'}}>
                            <Switch
                                style={{opacity:"0.5"}}
                                checked={true}
                                disabled={true}
                            />
                            <span style={{marginLeft:'8px'}}>Kích hoạt/Ngưng sử dụng</span>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </StyledModalPaymentMethod>
    )
}
const StyledModalPaymentMethod = styled.div`
  .right-sight-popup {
    &__default-payment-method {
      margin-top: 24px;
      display: flex;
      
      span {
        cursor: pointer;  
        margin-left: 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      }
    }
    &__active-payment-method {
      margin-top: 32px;
      position: relative;

      input[type="checkbox"] {
        position: relative;
        width: 2.125rem !important;
        height: 1.25rem !important;
        -webkit-appearance: none;
        background: #c6c6c6;
        outline: none;
        border-radius: 1.25rem;
        transition: 0.7s;
        cursor: pointer;
      }

      span {
        // cursor: pointer;  
        margin-left: 8px;
        position: absolute;
        
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      }

      input:checked[type="checkbox"] {
         background: #8fcdcc;
        
      }

      input[type="checkbox"]:before {
        content: '';
        position: absolute;
        width: 16.67px;
        height: 16.67px;
        border-radius: 50%;
        top: .1rem;
        left: 0;
        background: #ffffff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: .5s;
      }
      input:checked[type="checkbox"]:before {
        left: 1rem
      }
    }
  }
`