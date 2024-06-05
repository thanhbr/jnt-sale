import useCreateProductScroll from "../../../hooks/useCreateProductScroll";
import styled from "styled-components";
import React from "react";
import {useTranslation} from "react-i18next";

const InfoScroll = () => {
  const { t } = useTranslation()
  const {value, functions} = useCreateProductScroll()
  return (
    <StyledInfoScroll>
      <div>
        <ul className={'product-scroll__list'}>
          {value?.listTitle?.map((item) => {
            return (
              <li onClick={() => functions.scrollToItem(item.id, item.location)}
                  key={item.id}
              >
                <div className={`product-scroll__line ${item.active && 'product-scroll__line--active'}`}></div>
                <div className={`product-scroll__wrapper ${item.active && 'product-scroll__wrapper--active'}`}>
                  <span>{t(item.name)}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </StyledInfoScroll>
  );
};

export default InfoScroll;

export const StyledInfoScroll = styled.div`
  .product-scroll {
    &__list li {
      height: 48px;
      cursor: pointer;
    }
    &__line:before {
      content: '';
      width: 4px;
      height: 48px;
      background: #EBEEF5;
      position: absolute;
    }
    &__line--active:before {
      background: #1E9A98;
    }
    &__wrapper {
    position: relative;
      span {
        margin-left: 24px;
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        position: absolute;
      }
    }
    &__wrapper--active span {
      font-weight: 600;
    }
    &__list li:nth-child(2) .product-scroll__wrapper span {
      top: 8px;
    }
    &__list li:nth-child(3) .product-scroll__wrapper span {
      top: 16px;
    }
    &__list li:nth-child(4) .product-scroll__wrapper span {
      top: 18px;
    }
    &__list li:nth-child(5) .product-scroll__wrapper span {
      top: 24px;
    }
  } 
`
