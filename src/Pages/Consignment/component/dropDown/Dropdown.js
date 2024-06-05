import React, { useReducer } from 'react'
import './DropDown.scss';
import { TableCell } from "@material-ui/core"
import { CONSIGNMENT } from 'Component/Icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Reducer from 'Pages/Consignment/store/reducer';
import { InitialState } from 'Pages/Consignment/store/initState';
export default function Dropdown({ ...props }) {
    const { count, title, id, handleActive, handleDeActive} = props
    const [state, dispatch] = useReducer(Reducer, InitialState)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <TableCell align="left" colSpan={5} className="dropDown_main" >
                {count < 10 ?
                   <> 0{count} {title}</>
                    :<> {count} {title}</>
                }
                <button id="basic-button" className='btn_dropdown' onClick={handleClick}>Thao tác {CONSIGNMENT.iconDropDown}</button>
            </TableCell>
            <Menu
                id="basic-menu"
                className='dropdown_menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    handleActive()
                    handleClose()
                }}>Kích hoạt</MenuItem>
                <MenuItem onClick={() => {
                    handleDeActive()
                    handleClose()
                }}>Ngưng sử dụng</MenuItem>
                {title == "ghi chú được chọn" ? <MenuItem >Xóa</MenuItem> : ''}
            </Menu>
        </>

    )
}
