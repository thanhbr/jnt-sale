import React, {useContext, useRef, useState} from 'react';
import {CustomToolTip} from "../../../../Component/tooltip/CustomTooltip";
import {SCRIPT} from "../../_script";
import {ORDER_PAGE} from "../../../../Component/Icons";
import {OrderContext} from "../../../../LayoutWrapper";
import Popover from "@mui/material/Popover";
import {Button} from "../../../../common/button";
import { useForm } from "react-hook-form";
import './index.scss'

const Index = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [state, dispatch] = useContext(OrderContext)
  const [change, setChange] = useState(false)
  const { register, handleSubmit, reset, getValues } = useForm()
  const form = useRef(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    dispatch({type: 'TOGGLE_FILTER__ADVANCE'})
  }
  const handleClose = () => {
    setAnchorEl(null)
    dispatch({type: 'TOGGLE_FILTER__ADVANCE'})
  }
  const handleReset = () => {
    reset({
      'customer_id': '',
      'livestream_id': '',
    })
    setChange(false)
  }
  const onAdvanceFilter = () => {
    dispatch({type: 'SET_FILTER', payload: {keyword: {label: SCRIPT.T_CUSTOMER, value: getValues('customer_id'), name: getValues('customer_id') },
                                          livestream_id: {label: SCRIPT.T_LIVE, value: getValues('livestream_id'), name: getValues('livestream_id')}}})
    dispatch({ type: 'SET_LOAD_DETAIL' })
    dispatch({type: 'SET_CHIP_FILTER'})
    dispatch({type: 'TOGGLE_FILTER__ADVANCE'})

    setAnchorEl(null)
    if(getValues('customer_id') !== '' || getValues('livestream_id') !== '') setChange(true)
  }

  return (
    <>
      <CustomToolTip title={SCRIPT.TT_SEARCH_ADVANCE} arrow >
        <button className={`order-filter__plus ${state?.showFilterAdvance ? 'active' : ''} ${change ? 'change' : ''}`}
                aria-describedby={id} variant="contained"
                onClick={handleClick}
        >
          {ORDER_PAGE.search_push}
        </button>
      </CustomToolTip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <form ref={form}
              onSubmit={handleSubmit(onAdvanceFilter)}
              className={'advance-filter__form'}
        >
          <p className={'advance-filter__title'}>{SCRIPT.T_ADVANCE_TITLE}</p>
          <div className={'advance-filter__field'}>
            <label className={'advance-filter__lb-customer'}
                   htmlFor={'lb_customer'}
            >
              {SCRIPT.T_ADVANCE_CUSTOMER}
            </label>
            <input {...register("customer_id")}
                   id={'lb_customer'}
                   autoComplete={'off'}
                   placeholder={SCRIPT.PL_ADVANCE_CUSTOMER}/>
          </div>
          <div className={'advance-filter__field'}>
            <label className={'advance-filter__lb-video'}
                   htmlFor={'lb_video'}
            >{SCRIPT.T_ADVANCE_VIDEO}</label>
            <input {...register("livestream_id")}
                   id={'lb_video'}
                   autoComplete={'off'}
                   placeholder={SCRIPT.PL_ADVANCE_VIDEO}/>
          </div>
          <div className={'advance-filter__group-btn'}>
            <button type={'button'}
                    className={'advance-filter__group-btn-reset'}
                    onClick={handleReset}
            >{SCRIPT.BTN_REFRESH}</button>
            <div>
              <Button appearance={'secondary'}
                      className={'advance-filter__group-btn-dismiss'}
                      type={'button'}
                      onClick={handleClose}
              >
                {SCRIPT.BTN_CLOSE}
              </Button>
              <Button type={'submit'}
                      className={'advance-filter__group-btn-apply'}
              >
                {SCRIPT.BTN_APPLY}
              </Button>
            </div>
          </div>
        </form>
      </Popover>
    </>
  );
};

export default Index;