import React from "react";
import {StyledStoreConfigDetail} from "./styles";
import {Text} from "../../../../../../common/text";
import {Switch} from "../../../../../../common/switch";
import {THEME_COLORS} from "../../../../../../common/theme/_colors";
import {useUpdateStoreConfig} from "../../../../hook/useUpdateStoreConfig";

const Index = ({...props})=>{
    const {
        warningPhone,
        bulkOrder,
        quantityLowRate,
        functions
    }=useUpdateStoreConfig()
    const {activeValue} = bulkOrder

    return(
        <StyledStoreConfigDetail>
          {console.log('warningPhone', warningPhone)}
            <div className={'store-config'}>
                <div className={'store-config-btn-update'}>
                  <div className={'store-config-title'} >
                    <Text fontWeight={600}>Bán hàng</Text>
                    <div className={'store-config-switch-alert'}>
                      <Switch checked={warningPhone} disabled={true}/>
                      <Text style={{marginLeft:'8px'}} fontSize={15}>Cảnh báo SĐT khách hàng đã được tạo đơn trong ngày</Text>
                    </div>
                  </div>
                  <Text style={{width:'67px',cursor:'pointer'}} fontSize={15} onClick={functions.changeEdit} color={THEME_COLORS.blue_500}>Cập nhật</Text>
                </div>
                <div style={{display:'flex'}}>
                    <div className={'store-config-order-inventory'}>
                        <Text fontWeight={600}>Kho hàng</Text>
                        <div className={'store-config-inventory'}>
                            <Text  style={{marginRight:'16px',width:'144px'}} color={'#7A92A5'}>Số lượng tồn cảnh báo</Text>
                            <Text color={'#151624'} fontSize={15}>{quantityLowRate?.value}</Text>
                        </div>
                    </div>
                </div>

                <div className={'store-config-order-inventory'}>
                    <Text fontWeight={600}>Lên đơn hàng loạt</Text>
                    <div className={'store-config-inventory'}>
                        <Text  style={{marginRight:'16px',width:'144px'}} color={'#7A92A5'}>Cấu hình in vận đơn</Text>
                        <Text color={'#151624'} fontSize={15}>{activeValue?.name}</Text>
                    </div>
                </div>
            </div>
        </StyledStoreConfigDetail>
    )
}
export default Index;