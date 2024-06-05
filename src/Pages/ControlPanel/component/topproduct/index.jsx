// @mui
import {Card, CardHeader, Box} from '@mui/material'
// components
import React, {memo, useEffect, useState} from 'react'
import {getUrlTopProducts} from '../../../../api/url'
import {getData} from '../../../../api/api'
import {formatMoney} from '../../../../util/functionUtil'
import "./index.scss"
import ReactImageFallback from "react-image-fallback";
import ContentLoader from 'styled-content-loader'
// ----------------------------------------------------------------------

const TopProducts = function({ title, subheader,startTime, endTime, ...other }) {

  const [products, setProducts] = useState(() => window.localStorage.getItem('top_product') ? JSON.parse(window.localStorage.getItem('top_product')) : [])

  const url = getUrlTopProducts(startTime, endTime)
  useEffect(() => {
    getData(url)
      .then(res => {
        if (res.data.success) {
          setProducts(res.data)
          window.localStorage.setItem('top_product', JSON.stringify(res.data))
        }
      })
      .catch(err => {
        console.log('error')
      })
  }, [startTime])
  return (
    <div {...other} className="custom-products">
      <div className="header-product">
        <div className="header-content-left">
          <span>{title}</span>
        </div>
        <div className="header-content-right">
          {/* <a href="#">
            <span>Xem chi tiết</span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9L5 5L1 1" stroke="#0052FF" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a> */}
        </div>
      </div>
      { (products.success) ?
        <Box className="content-item">
          { products.data.length > 0 ?
            products.data.map((product,index) => {
                return (
                  <div className="item-product" key={index}>
                    <div className="left-item">
                      <div className="stt-product">
                        <p className={`stt-${index + 1}`}>#{index + 1}</p>
                      </div>
                      <div className="info-product">
                        <div className="img-content">
                          <ReactImageFallback
                            src={product.image_thumb}
                            fallbackImage="/img/iconMenu/defaultAccount.png"
                            alt={product.product_name}
                            className="product-image"
                          />
                        </div>
                        <div className="description-product">
                          <p className="name-product">{product.product_name}</p>
                          <p className="branch-product">
                            {product.category_name ?? ''}
                          </p>
                        </div>
                        <div className="top_price-product">
                          <p>{formatMoney(product.total_price)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            :
            <div className="content-empty-products">
              <div className="img-content">
                <img src="/img/controlpanel/empty-state.svg" alt="empty -product"/>
              </div>
              <div className="span-content">
                <span>Chưa có sản phẩm</span>
              </div>
            </div>
          }
        </Box>
        :
        <ContentLoader  backgroundColor= "#FFFFFF"
                        foregroundColor= "#F4F7FC" >
          <img src="/img/controlpanel/top-product-loading.png" alt="top-product"/>
        </ContentLoader>
      }
    </div>
  )
}
export default memo(TopProducts)
