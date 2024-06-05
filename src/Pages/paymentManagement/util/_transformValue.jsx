import {RECIPIENT_GROUP_TYPE} from "../interfaces/_const";

export const transFormValue = (type,data)=>{
    let list = []
    switch (type) {
        case RECIPIENT_GROUP_TYPE[0] :
            list = data.map(item => {
                return {value:item?.id, name:item?.name,mobile: item?.mobile}
            })
            break
        case RECIPIENT_GROUP_TYPE[1] :
            list = data.map(item => {
                return {value:item?.supplier_id, name:item?.supplier_name,mobile: item?.mobile}
            })
            break
        case RECIPIENT_GROUP_TYPE[2] :
            list = data.map(item => {
                return {value:item?.user_id, name:item?.fullname,mobile: item?.phone}
            })
            break
        case RECIPIENT_GROUP_TYPE[3] :
            list = data.map(item => {
                return {value:item?.id, name:item?.name}
            })
            break
        default:
            break;
    }
    return list
}