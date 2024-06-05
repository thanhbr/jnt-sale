import React, {useEffect, useReducer} from "react";
import {StyledStoreAccountDetail} from "../_styled";
import {Text} from "../../../../../../../common/text";
import {THEME_COLORS} from "../../../../../../../common/theme/_colors";
import {Button} from "../../../../../../../common/button";
import {THEME_SEMANTICS} from "../../../../../../../common/theme/_semantics";
import {Input} from "../../../../../../../common/form/input";
import {ICON_ACCOUNT} from "../../../../../interface/icon";
import {ORDER_SINGLE_ICONS} from "../../../../../../../Pages/orderSingle/interface/_icons";
import {AutoCompleteSingleOption} from "../../../../../../../Pages/orderSingle/components/autocompleteSingleOption";
import {AlternativeAutoComplete} from "../../../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {useEditStore} from "../../../../../hook/useEditStore";
import {useSlitAddress} from "../../../../../hook/useSlitAddress";
import {useAccountAction, useAccountReducer, useAccountState} from "../../../../../reducer/reducer";
import {getData, postData} from "../../../../../../../api/api";
import {getShopInfo, updateShopInfo} from "../../../../../../../api/url";
import toast from "../../../../../../../Pages/ShippingPartner/components/toast";

const Index = ({...props}) => {
    const {info, acceptEdit, cancelEdit, isUpdate,handleClose,fetchShopInfo,setCloseAnchor} = props
    const [state, dispatch] = useReducer(useAccountReducer, useAccountState)
    const {
        checkEmty,
        checkDisable,
        check_name,
        check_phone,
        check_email,
        data,
        properties,
        methods,
        list_id,
        checkAddress
    } = useEditStore(info, isUpdate,setCloseAnchor)
    const {address} = data
    const {province, district, ward} = address
    useEffect(()=>{
        dispatch({
                        type: useAccountAction.FORM_ADDRESS_UPDATE,
                      payload: {value: info?.address},
                    })
    },[])
    const handleUpdate = async(id) =>{
        const updateStore = {
            shopname : check_name.infoName,
            phone : check_phone.infoPhone,
            email : check_email.infoEmail,
            vip_code_jnt : info.vip_code_jnt,
            address : list_id.address ? list_id.address  : '',
            city_id : list_id.id_city?.value ? list_id.id_city?.value  : '',
            district_id : list_id.id_district?.value ? list_id.id_district?.value  : '',
            ward_id : list_id.id_ward?.value ? list_id.id_ward?.value  : ''
        }
        if(!checkDisable){
            try{
                const res = await postData(updateShopInfo(id),updateStore)
                if(res.data.success){
                    toast.success({title:'Cập nhật thông tin cửa hàng thành công'})
                    isUpdate(false)
                    fetchShopInfo()
                    handleClose()
                }
            }catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <StyledStoreAccountDetail>
            {info &&
            <div className={'store-update'}>
                <div className='store-update_group'>
                    <Text className='store-update_title'
                          color={'#7A92A5'}
                    >Tên cửa hàng {ICON_ACCOUNT.mark}</Text>

                    <Input
                        {...props}
                        className={'store-update_input-edit'}
                        value={check_name.infoName}
                        validateText={check_name.errorName.valid ? check_name.errorName.message : null}
                        validateType={!check_name.errorName.valid ? 'success' : 'danger'}
                        onChange={(e) => check_name.onChangeNameStore(e.target.value)}
                        onBlur={e => check_name.onBlurNameStore(e.target.value)}
                    />
                </div>
                <div className='store-update_group'>
                    <Text color={'#7A92A5'} className='store-update_title'>Số điện thoại {ICON_ACCOUNT.mark}</Text>
                    <Input
                        {...props}
                        className={'store-update_input-edit'}
                        value={check_phone.infoPhone}
                        validateText={check_phone.errorPhone.valid ? check_phone.errorPhone.message : null}
                        validateType={!check_phone.errorPhone.valid ? 'success' : 'danger'}
                        onChange={(e) => check_phone.onChangePhoneStore(e.target.value)}
                        onBlur={e => check_phone.onBlurPhoneStore(e.target.value)}
                    />
                </div>
                <div className='store-update_group'>
                    <Text color={'#7A92A5'} className='store-update_title'>Email</Text>
                    <Input
                        {...props}
                        className={'store-update_input-edit'}
                        value={check_email.infoEmail}
                        validateText={check_email.errorEmail.valid ? check_email.errorEmail.message : null}
                        validateType={!check_email.errorEmail.valid ? 'success' : 'danger'}
                        onChange={(e) => check_email.onChangeEmailStore(e.target.value)}
                        onBlur={e => check_email.onBlurEmailStore(e.target.value)}
                    />
                </div>
                <div className='store-update_group'>
                    <Text color={'#7A92A5'} className='store-update_title'>Mã KH VIP</Text>
                    <Input
                        {...props}
                        className={'store-update_input-edit'}
                        value={info.vip_code_jnt}
                        disabled={true}
                    />
                </div>
                <div className='store-update_group store-update_slit-address'>
                    <Text color={'#7A92A5'} className='store-update_title'>Địa chỉ</Text>
                    <Input
                        {...props}
                        className={'store-update_input-edit'}
                        button={
                            <Button
                                // disabled={!properties.canSplitAddress}
                                icon={ORDER_SINGLE_ICONS.target}
                                onClick={methods.onAddressSplit}
                            >
                                Tách
                            </Button>
                        }
                        placeholder="Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,.."
                        value={address.value}
                        onChange={e => methods.onAddressChange(e.target.value)}
                    />
                </div>
                <div className='store-update_group'>
                    <Text color={'#7A92A5'} className='store-update_title'>Tỉnh/Thành phố</Text>
                    <AlternativeAutoComplete
                        {...props}
                        // main input
                        className={'store-update_input-edit'}
                        inputProps={{
                            categoryList: [], // menu list in category dropdown
                            categoryValue: {name: 'Tỉnh / Thành phố', value: ''}, // if not exist this value -> default category: categoryList[0]
                            categoryHidden: true,

                            placeholder: 'Chọn tỉnh / thành phố',
                            readOnly: true,
                            value: province.value?.name || '',
                        }}
                        // search menu dropdown
                        menuProps={{
                            empty:
                                province.list.length <= 0 ? 'Không tìm thấy tỉnh / thành phố' : '',
                        }}
                        // search input in dropdown menu
                        searchInputProps={{
                            placeholder: 'Tìm kiếm tỉnh / thành phố',
                            value: province.keyword || '',
                            onChange: methods.onProvinceKeywordChange,
                        }}
                    >
                        {province.list.length > 0 &&
                        province.list.map(item => (
                            <AutoCompleteSingleOption
                                key={item.value}
                                data-active={item.value === province.value?.value}
                                onClick={() => methods.onProvinceChange(item)}
                            >
                                {item.name}
                            </AutoCompleteSingleOption>
                        ))}
                    </AlternativeAutoComplete>
                </div>
                <div className='store-update_group'>
                    <Text color={'#7A92A5'} className='store-update_title'>Quận/Huyện</Text>
                    <AlternativeAutoComplete
                        {...props}
                        // main input
                        className={'store-update_input-edit'}
                        inputProps={{
                            categoryList: [], // menu list in category dropdown
                            categoryValue: {name: 'Quận / Huyện', value: ''}, // if not exist this value -> default category: categoryList[0]
                            categoryWidth: 140,
                            categoryHidden: true,
                            disabled: !!!province.value,
                            placeholder: 'Chọn quận / huyện',
                            readOnly: true,
                            value: district.value?.name || '',
                        }}
                        // search menu dropdown
                        menuProps={{
                            empty: district.list.length <= 0 ? 'Không tìm thấy quận / huyện' : '',
                        }}
                        // search input in dropdown menu
                        searchInputProps={{
                            placeholder: 'Tìm kiếm quận / huyện',
                            value: district.keyword || '',
                            onChange: methods.onDistrictKeywordChange,
                        }}
                    >
                        {district.list.length > 0 &&
                        district.list.map(item => (
                            <AutoCompleteSingleOption
                                key={item.value}
                                data-active={item.value === district.value?.value}
                                onClick={() => methods.onDistrictChange(item)}
                            >
                                {item.name}
                            </AutoCompleteSingleOption>
                        ))}
                    </AlternativeAutoComplete>
                </div>
                <div className='store-update_group'>
                    <Text color={'#7A92A5'} className='store-update_title'>Phường/Xã</Text>
                    <AlternativeAutoComplete
                        {...props}
                        // main input
                        className={'store-update_input-edit'}
                        inputProps={{
                            categoryList: [], // menu list in category dropdown
                            categoryValue: {name: 'Xã / Phường', value: ''}, // if not exist this value -> default category: categoryList[0]
                            categoryWidth: 140,
                            categoryHidden: true,
                            disabled: !!!district.value,
                            placeholder: 'Chọn xã / phường',
                            readOnly: true,
                            value: ward.value?.name || '',
                        }}
                        // search menu dropdown
                        menuProps={{
                            empty: ward.list.length <= 0 ? 'Không tìm thấy xã / phường' : '',
                        }}
                        // search input in dropdown menu
                        searchInputProps={{
                            placeholder: 'Tìm kiếm xã / phường',
                            value: ward.keyword || '',
                            onChange: methods.onWardKeywordChange,
                        }}
                    >
                        {ward.list.length > 0 &&
                        ward.list.map(item => (
                            <AutoCompleteSingleOption
                                key={item.value}
                                data-active={item.value === ward.value?.value}
                                onClick={() => methods.onWardChange(item)}
                            >
                                {item.name}
                            </AutoCompleteSingleOption>
                        ))}
                    </AlternativeAutoComplete>
                </div>
                <div className='store-update_action-btn'>
                    <Button appearance={'ghost'} onClick={cancelEdit}>Hủy</Button>
                    <Button className={'store-update_accept'} disabled={checkDisable} onClick={()=>handleUpdate(info.shop_id)}>Cập
                        nhật</Button>
                </div>
            </div>
            }
        </StyledStoreAccountDetail>

    )
}
export default Index;