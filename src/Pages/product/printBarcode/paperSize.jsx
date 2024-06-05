import React, {useState} from 'react';
import {Grid} from "@mui/material";
import {PRODUCT_PAPER_SIZE} from "../interfaces/~constants";
import styled from "styled-components";
import usePrintBarcode from "../hooks/usePrintBarcode";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const PaperSize = () => {
  const { t } = useTranslation()
  const {value, functions} = usePrintBarcode()

  return (
    <StyledProductPaperSize>
      <Grid container>
        {value?.pageSize?.map(item => {
          const title = item?.title?.replace('product_page_paper_roll', t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_ROLL))?.replace('tem', t(DISPLAY_NAME_MENU.PRODUCT_PAGE.TEM))
          const sub_title = item?.sub_title?.replace('product_page_paper_size_print', t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_SIZE_PRINT))?.replace('tem', t(DISPLAY_NAME_MENU.PRODUCT_PAGE.TEM))
          return (
            <Grid xs={2} sm={2} md={2} lg={2} item>
              <div className={'paper-size'}
                   onClick={() => functions?.onCheckSize(item)}
              >
                <input className={`paper-size--check ${+item?.active === 1 ? 'paper-size--check-active' : ''}`}
                       type={'radio'}
                />
                <div className={`paper-size--group-image ${+item?.active === 1 ? 'paper-size--group-image-active' : ''}`}>
                  <img src={item?.image_link} alt={item?.code}/>
                </div>
                <div className={'paper-size--group'}>
                  <p className={'paper-size--group-title'}>{title}</p>
                  <p className={'paper-size--group-sub-title'}>{sub_title}</p>
                </div>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </StyledProductPaperSize>
  );
};

export default PaperSize;

export const StyledProductPaperSize = styled.div`
  .paper-size {
    position: relative;
    &--check {
      position: absolute;
      left: 16px;
      top: 10px;
      &:before {
        content: '';
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid #DDDDE3;
        
        position: absolute;
        top: -3px;
        left: -3px;
        background: #F5F5FA;
        cursor: pointer;
      }
      &-active {
        &:before {
          content: '';
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid #1E9A98;
          
          position: absolute;
          top: -3px;
          left: -3px;
          background: #fff;
          cursor: pointer;
        }
        &:after {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #1E9A98;
          
          position: absolute;
          top: 0;
          left: 0;
          background: #1E9A98;
          cursor: pointer;
        }
      }
    }
    &--group-image {
      width: 8.75rem;
      height: 7.4375rem;
      border: 1px solid #DDDDE3;
      border-radius: 8px;
      
      cursor:pointer;
      margin: auto;
      text-align: center;
      img {
        height: 7.1875rem;
      }
      &-active {
        border: 1px solid #1E9A98;
      }
    }
    &--group {
      text-align: center;
      margin-top: 16px;
      font-size: 14px;
      &-title {
        font-weight: 600;
      }
    }
  }
`
