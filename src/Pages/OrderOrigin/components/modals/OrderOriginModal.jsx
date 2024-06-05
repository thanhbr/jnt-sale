import React, {useState, useEffect} from 'react';
import {Box, Modal} from "@mui/material";
import '../../../../Component/FeedBack/index.module.scss'
import cls from "clsx";
import css from "./index.module.scss";
import {FEED_BACK_ICONS} from "../../../../Component/FeedBack/_icons";
import {Button} from "../../../../common/button";
import {useForm} from "react-hook-form";
import {postData} from "../../../../api/api";
import toast from "../../../../Component/Toast";
import {getUrlCreateCustomerGroup, getUrlUpdateCustomerGroup} from "../../../../api/url";
import ModalConfirm from "../../../../Component/ModalConfirm";
import {REGEX_CUSTOMER_CODE} from "../../../../util/regex";
import useOrderOriginContext from '../../hooks/_context'
import useOrderOrigin from '../../hooks/useOrderOrigin'
import {failIcon, successIcon} from '../../components/notification'
import {ICONS} from '../../interfaces/_icons'
import {Tooltip} from '../../../../common/tooltip'
import config from '../../../../config'
import {Text} from "../../../../common/text";
import styled from "styled-components";
import {replaceAllCustom} from '../../../../util/functionUtil'

const OrderOriginModal = ({...props}) => {
    const {register, handleSubmit, formState: {errors}, reset, setError, getValues} = useForm({
        mode: 'all'
    });
    const [state, dispatch] = useOrderOriginContext();
    const [nb_oder_value, setNb_oder_value] = useState(0)
    const [aniModalClose, setAniModalClose] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const {functions} = useOrderOrigin()
    useEffect(() => {
        if (props.dataRow) setNb_oder_value(props.dataRow.nb_order)
    }, [props.dataRow])
    const onSubmit = data => {

        const dataReset = {
            // eslint-disable-next-line no-undef
            nb_order: _.cloneDeep(getValues("nb_order")),
            // eslint-disable-next-line no-undef
            name: _.cloneDeep(getValues("name")),
        }
        reset({
            'nb_order': '',
            'name': ''
        })
        const newOrder = {
            name: data?.name.trim(),
            nb_order: nb_oder_value,
            status: data?.status,
        }
        if (!props.dataRow) {
            const url = `${config.API}/order/origin/create`
            const url_status = `${config.API}/order/origin/active`
            data.status = data.status == true ? 1 : 0;
            postData(url, newOrder)
                .then(res => {
                    if (res.data && res.data.success) {
                        if (res.data.success == true) {
                            const id_order = res.data.meta.insert_id
                            postData(url_status, {id: [id_order], status: data.status})
                                .then(res => {

                                    functions.fetchData()

                                })
                                .catch(er => console.log(er))
                            dispatch({
                                type: 'SET_SUCCESS_MESSAGE',
                                payload: {active: true, message: res.data.message, success: true, iconUrl: successIcon}
                            })
                        } else {
                            dispatch({
                                type: 'SET_SUCCESS_MESSAGE',
                                payload: {active: true, message: res.data.message, success: false, iconUrl: failIcon}
                            })
                        }

                        dispatch({type: 'SET_CREATED', payload: true})
                        setIsUpdate(false)
                        props.closeModal(true)

                    } else {
                        if (res.data.errors.details[0].code === 2038) setError(res.data.errors.details[0].field,
                            {type: 'invalid', message: 'Tên nguồn đơn hàng không được bỏ trống'},
                            {shouldFocus: true});
                        dispatch({
                            type: 'SET_SUCCESS_MESSAGE',
                            payload: {
                                active: true,
                                message: "Tên nguồn đơn hàng đã tồn tại!",
                                success: false,
                                iconUrl: failIcon
                            }
                        })
                    }
                })
                .catch(e => {
                    console.log(`ERROR ADD GROUP CUSTOMER: ${e.message}`)
                })
        } else {
            const url = `${config.API}/order/origin/update/${props.dataRow.id}`
            data.status = data.status == true ? 1 : 0;
            const updateData = {...newOrder, status: data.status}
            postData(url, updateData)
                .then(res => {
                    if (res.data && res.data.success) {
                        if (res.data.success == true) {
                            dispatch({
                                type: 'SET_SUCCESS_MESSAGE',
                                payload: {active: true, message: res.data.message, success: true, iconUrl: successIcon}
                            })
                        } else {
                            dispatch({
                                type: 'SET_SUCCESS_MESSAGE',
                                payload: {active: true, message: res.data.message, success: false, iconUrl: failIcon}
                            })
                        }
                        setIsUpdate(false)
                        props.closeModal(true)
                        functions.fetchData()
                    } else {
                        reset(dataReset)
                        if (res.data.errors.details[0].code === 2038) setError(res.data.errors.details[0].field,
                            {type: 'invalid', message: 'Tên nguồn đơn hàng không được bỏ trống'},
                            {shouldFocus: true});

                        dispatch({
                            type: 'SET_SUCCESS_MESSAGE',
                            payload: {
                                active: true,
                                message: "Cập nhật nguồn đơn hàng thất bại!",
                                success: false,
                                iconUrl: failIcon
                            }
                        })
                    }
                })
                .catch(e => {
                    console.log(`ERROR UPDATE GROUP CUSTOMER: ${e.message}`)
                })
        }
    }
    const handleConfirm = confirm => {
        setConfirm(false)
        if (confirm) {
            setAniModalClose(true)
            setTimeout(() => {
                props.closeModal(true)
                setAniModalClose(false)
            }, 300)
        }
    }
    const handleClose = () => {
        if (!isUpdate) {
            setAniModalClose(true)
            setTimeout(() => {
                props.closeModal(true)
                setAniModalClose(false)
            }, 300)
        } else {
            setConfirm(true)
        }
    }
    return (
        <>
            <Modal
                open={props.show}
                onClose={handleClose}
            >
                <Box className={`${cls(css.box_modal)} ${aniModalClose && cls(css.modal_custom)}`}>
                    <div className={cls(css.dismiss)}
                         onClick={handleClose}
                    >
                        {FEED_BACK_ICONS.dismiss}
                    </div>
                    <div className={cls(css.wrapper)}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className={cls(css.title)}>Thông tin nguồn đơn hàng</p>
                            <p className={cls(css.sub_title)}>“Giúp bạn quản lý các nguồn phát sinh đơn hàng”</p>
                            <div className={cls(css.general)}>
                                <label htmlFor={'modal_cus_name'}>Nguồn đơn hàng <span>*</span></label>
                                <div className={cls(css.field)}>
                                    <input id={'modal_cus_name'}
                                           placeholder={'Nhập tên nguồn đơn hàng'}
                                           maxLength={31}
                                           autoComplete={'off'}
                                           className={`${errors.name ? cls(css.input_error) : cls(css.input_success)}`}
                                           {...register("name", {
                                               required: "Tên nguồn đơn hàng không được bỏ trống!",
                                               maxLength: {
                                                   value: 30,
                                                   message: "Tên nguồn đơn hàng không được quá 30 ký tự"
                                               },
                                               onChange: (e) => {

                                                   setIsUpdate(true)
                                               }
                                           })}
                                           defaultValue={props.dataRow ? props.dataRow.name : ''}
                                    />
                                    {errors.name && (
                                        <>
                                            <span className={cls(css.errors)}>{errors.name.message}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={cls(css.general)}>
                                <label className={'position-display'} htmlFor={'modal_cus_id'}>Vị trí hiển thị <Tooltip
                                    placement="right" title={(
                                    <p>Vị trí 0 sẽ xuất hiện đầu tiên,<br/> số càng lớn, vị trí càng thấp
                                    </p>)}>{ICONS.question}</Tooltip></label>
                                <div className={cls(css.field)}>
                                    <input
                                        placeholder={'Nhập vị trí hiển thị'}
                                        id={'modal_cus_id'}
                                        className={`cls(css.input_success)}`}
                                        maxLength={50}
                                        autoComplete={'off'}
                                        onChange={(e) => {
                                            let {value} = e.target
                                            value = value.trim()
                                            const re = /^[0-9\b]+$/;
                                            if (value === '' || re.test(value)) {
                                                setNb_oder_value(value)
                                                setIsUpdate(true)
                                            }
                                        }}
                                        value={nb_oder_value ? nb_oder_value : ''}
                                    />
                                </div>
                            </div>
                            <div className={cls(css.grp_acin)}>
                                <input type={'checkbox'}
                                       className={cls(css.active_toggle)}
                                       {...register("status", {
                                           onChange: (e) => {
                                               setIsUpdate(true)
                                           }
                                       })}
                                       defaultChecked={props.dataRow ? props.dataRow.status == 1 ? true : false : true}
                                />
                                <div className={cls(css.acin_text)}>
                                    <span className={cls(css.acin)}>Kích hoạt/Ngưng sử dụng</span>
                                </div>
                            </div>
                            <div className={cls(css.group_button)}>
                                <hr/>
                                <Button className={cls(css.cancel)}
                                        type={'button'}
                                        appearance={'secondary'}
                                        onClick={handleClose}
                                >Hủy</Button>
                                <Button className={props.dataRow ? cls(css.update) : cls(css.save)}
                                        type={'submit'}>{props.dataRow ? "Lưu" : "Lưu"}</Button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={confirm}
                onClose={() => {
                    handleConfirm(false)
                    setConfirm(false)
                }}
                className={'order-origin_modal-confirm'}
            >
                <Box className={'order-origin_modal-confirm__box'}>3
                    <StyleModalConfirmOrder>
                        <div className={'order-origin-box'}>
                            <Text
                                fontSize={20}
                                fontWeight={600}
                            >Xác nhận rời khỏi trang</Text>
                            <Text as='p' className='order-origin-box__txt'>Một số thông tin đã thay đổi, bạn có chắc
                                chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
                            <div className={'modal-confirm__group-btn'}>

                                <Button size='sm' className={'order-origin-box__dismiss'} appearance={'ghost'}
                                        onClick={() => {
                                            handleConfirm(false)
                                            setConfirm(false)
                                        }}
                                >Hủy</Button>
                                <Button size='sm' className={'order-origin-box__save'}
                                        onClick={() => {
                                            handleConfirm(true)
                                            setConfirm(false)
                                        }}
                                >Xác nhận</Button>
                            </div>
                        </div>
                    </StyleModalConfirmOrder>

                </Box>
            </Modal>
        </>
    )
};

export default OrderOriginModal;
const StyleModalConfirmOrder = styled.div`
    .order-origin-box{
        width: 480px;
        height:196px;
        background:#ffffff;
        border-radius:6px;
        padding:24px;
        margin: 20rem 0 0 45rem;
        &__txt{
            margin-top:24px;
        }
        &__dismiss{
            width:110px;
            height:32px;
        }
        &__save{
            margin-left: 8px;
        }
    }
    @media screen and (max-width : 1280px){
        .order-origin-box{
             margin: 20rem 0 0 32rem; 
              .modal-confirm__group-btn {
             margin-top: 32px;
        }
        }
    }
    @media screen and (max-width : 1366px) and (max-width : 1439px){
        .order-origin-box{
             margin: 17rem 0 0 31rem;
              .modal-confirm__group-btn {
             margin-top: 32px;
        }
        }
    }
    @media screen and (max-width : 1440px) and (max-width : 1919px){
        .order-origin-box{
             margin: 15rem 0 0 28rem; 
             .modal-confirm__group-btn {
             margin-top: 32px;
        }
    }
`