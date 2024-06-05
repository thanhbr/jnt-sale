import React, {useContext} from 'react';
import {Grid} from "@mui/material";
import {useForm} from "react-hook-form";

import SearchDate from "../More/SearchDate";
import Employee from "../More/Employee";
import Status from "../More/Status";
import Shipping from "../More/Shipping";
import Product from "../More/Product";
import Origin from "../More/Origin";
import WareHouse from "../More/WareHouse";
import Duplicate from "../More/Duplicate";
import {Button} from "../../../../common/button";
import {SCRIPT} from "../../_script";
import {OrderContext} from "../../../../LayoutWrapper";

const Index = () => {
  const [, dispatch] = useContext(OrderContext)
  const { handleSubmit} = useForm()

  const onSubmit = () => {
    dispatch({ type: 'SET_LOAD_DETAIL' })
    dispatch({ type: 'SET_APPLY_SEARCH'})
    dispatch({type: 'SET_CHIP_FILTER'})
    dispatch({type: 'SET_LOADING', payload: true})
    dispatch({type: 'SET_LOADING_PANEL', payload: true})
  }
  return (
    <>
      <form className={'order-filter-more'} onSubmit={handleSubmit(onSubmit)}>
        <Button appearance={'secondary'} className={'order-filter-apply'}>{SCRIPT.BTN_APPLY}</Button>
        <Grid xs={12} sm={12} md={12} lg={12} container className={'order-filter-more__content'}>
          <Grid xs={4} sm={4} md={4} lg={4} xl={3} item className={'order-filter-more__item'}>
            <SearchDate />
          </Grid>
          <Grid xs={4} sm={4} md={4} lg={4} xl={3} item className={'order-filter-more__item'}>
            <Employee />
          </Grid>
          <Grid xs={4} sm={4} md={4} lg={4} xl={3} item className={'order-filter-more__item'}>
            <Status/>
          </Grid>
          <Grid xs={4} sm={4} md={4} lg={4} xl={3} item className={'order-filter-more__item'}>
            <Shipping/>
          </Grid>
          <Grid xs={4} sm={4} md={4} lg={4} xl={3} item className={'order-filter-more__item'}>
            <Product />
          </Grid>
          <Grid xs={4} sm={4} md={4} lg={4} xl={3} item className={'order-filter-more__item'}>
            <Origin/>
          </Grid>
          <Grid xs={4} sm={4} md={4} lg={4} xl={3} item className={'order-filter-more__item'}>
            <WareHouse/>
          </Grid>
          <Grid xs={4} sm={4} md={4} lg={4} xl={3} item className={'order-filter-more__item'}>
            <Duplicate />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Index;