import React from 'react';
import {ORDER_PAGE} from "../../../../../../Component/Icons/";
import './index.scss'

const Index = ({...props}) => {
  const {products, dismiss} = props
  return (
    <>
        <div className={'u-input-tag__list scroll-custom'}>
          {products.map(product => (
            <div key={product.id} className={'u-input-tag__wrapper u-input-tag__wrapper-child'}>
              <div className={'u-input-tag__group'}>
                <div className={'u-input-tag__title'}>{product.name}</div>
                <div className={'u-input-tag__icon'}
                     onClick={() => dismiss(product.id)}
                >
                  {ORDER_PAGE.cancel}
                </div>
              </div>
            </div>
            )
          )}
        </div>
    </>
  );
};

export default Index;