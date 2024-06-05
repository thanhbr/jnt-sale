import React from 'react';
import {Button} from "../../../../../common/button";
import {Grid} from "@mui/material";
import {Text} from "../../../../../common/text";
import {formatMoney} from "../../../../../util/functionUtil";
import {Input} from "../../../../../common/form/input";
import usePosPayment from "../../../hooks/usePosPayment";

const Verification = () => {
  const {calc, methods, formCreate, notes} = usePosPayment()

  return (
    <Grid container>
      <Grid xs={6} sm={6} md={6} lg={6} item>
        <Text as={'p'}
              fontWeight={600}
              lineHeight={'140%'}
              style={{marginBottom: 8}}
        >Tiền khách đưa</Text>
        <Text as={'p'}
              fontWeight={600}
              lineHeight={'140%'}
              style={{marginBottom: 8}}
        >Tiền thừa trả khách</Text>
      </Grid>
      <Grid xs={6} sm={6} md={6} lg={6} item>
        <div className={'content-pos--footer-verification'}>
          <Text as={'p'}
                fontWeight={600}
                lineHeight={'140%'}
                fontSize={16}
                style={{marginBottom: 8}}
                color={'#00AB56'}
          >{formatMoney(calc.moneyCustomer || 0)}</Text>
        </div>
        <div className={'content-pos--footer-verification'}>
          <Text as={'p'}
                fontWeight={600}
                lineHeight={'140%'}
                fontSize={16}
                style={{marginBottom: 8}}
          >{formatMoney(calc.moneyCustomer - calc.guestMustPay)}</Text>
        </div>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} item>
        <Input placeholder={'Nhập ghi chú đơn hàng'}
               maxLength={256}
               validateText={notes?.length > 255 && 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự'}
               validateType={'danger'}
               style={{marginBottom: 24, height: 36}}
               onChange={e => methods.handleChangeNote(e.target.value)}
               value={notes || ''}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} item>
        <Button onClick={() => methods?.submit(formCreate)}>Xác nhận thanh toán (F9)</Button>
      </Grid>
    </Grid>
  )
}

export default Verification