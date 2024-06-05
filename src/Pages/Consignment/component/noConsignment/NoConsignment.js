import React, { useReducer } from 'react';
import "./noConsignment.scss";
import { CONSIGNMENT } from 'Component/Icons';
import house from "../../image/Group 26780.png"
import { TableCell ,TableRow} from '@material-ui/core';

export default function NoConsignment({ ...props }) {
    const {title}=props
    return (
        <TableRow className='consignment__data'>
            <TableCell align="center" colSpan={6}>
            <img src={house} className='consignment_image' />
            <p className='consignment_p'>{title}</p>
            {
                title=='Bạn chưa có điểm gửi hàng nào'? <button className="btn-consignment"  onClick={props.handleAddNew}>
                <span className='consignment__icon'>{CONSIGNMENT.plus}</span>
                <span className='consignment__text'>Tạo điểm gửi hàng mới</span>
            </button>:''
            }
           
            </TableCell>
           
        </TableRow>
    )
}
