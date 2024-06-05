import React, {useEffect, useState} from "react";
import {StyledStoreAccountDetail} from "../_styled";
import {THEME_SEMANTICS} from "../../../../../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../../../../../common/theme/_colors";
import {Text} from "../../../../../../../common/text";
import {Button} from "../../../../../../../common/button";
const Index = ({...props}) => {
    const {info,changeEdit} = props
    const [infoAdress,setInfoAddress] = useState()
    useEffect(()=>{
        let address = '';
        let province = '';
        let district = '';
        let  ward = '';
        if(info){
            address = info?.address ? `${info?.address}`: '';
            province = info?.city_name ? ` ${info?.city_name}`:'';
            district = info?.district_name ? ` ${info?.district_name},` : ``;
            ward = info?.ward_name ? ` ${info?.ward_name},` : ``;
        }
        setInfoAddress(address)
    },[info])

    return (
        <StyledStoreAccountDetail>
            {info &&
            <div className={'store-detail'}>
                <div className='store-detail_group'>
                    <Text className='store-detail_title'
                        color={'#7A92A5'}
                    >Tên cửa hàng</Text>
                    <Text className='store-detail_input'>{info.shopname}</Text>
                    <Text
                        className={'store-detail_btn-update'}
                        onClick={changeEdit}
                        color={THEME_COLORS.blue_500}
                        fontSize={15}
                    >
                        Cập nhật
                    </Text>
                </div>
                <div className='store-detail_group'>
                    <Text color={'#7A92A5'} className='store-detail_title'>Số điện thoại</Text>
                    <Text className='store-detail_input'>{info.phone}</Text>
                </div>
                <div className='store-detail_group'>
                    <Text color={'#7A92A5'} className='store-detail_title'>Email</Text>
                    <Text className='store-detail_input'>{info.email ? info.email : '_ _ _'}</Text>
                </div>
                <div className='store-detail_group'>
                    <Text color={'#7A92A5'} className='store-detail_title'>Mã KH VIP</Text>
                    <Text className='store-detail_input'>{info.vip_code_jnt}</Text>
                </div>
                <div className='store-detail_group'>
                    <Text color={'#7A92A5'} className='store-detail_title'>Địa chỉ</Text>
                    <Text className='store-detail_input'>{infoAdress?infoAdress:`_ _ _`}</Text>
                </div>
                <div className='store-detail_group'>
                    <Text color={'#7A92A5'} className='store-detail_title'>Tỉnh/Thành phố</Text>
                    <Text className='store-detail_input'>{info.city_name?info.city_name:`_ _ _`}</Text>
                </div>
                <div className='store-detail_group'>
                    <Text color={'#7A92A5'} className='store-detail_title'>Quận/Huyện</Text>
                    <Text className='store-detail_input'>{info.district_name?info.district_name:`_ _ _`}</Text>
                </div>
                <div className='store-detail_group'>
                    <Text color={'#7A92A5'} className='store-detail_title'>Phường/Xã</Text>
                    <Text className='store-detail_input'>{info.ward_name?info.ward_name:`_ _ _`}</Text>
                </div>
            </div>
            }
        </StyledStoreAccountDetail>
    )
}
export default Index;