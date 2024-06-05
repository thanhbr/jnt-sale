import React, {useContext, useState} from 'react';
import {
  CREATE_PRODUCT_REDIRECT_CONSTANTS,
  EDIT_MULTIPLE_PRODUCT_REDIRECT_CONSTANTS,
  EDIT_SINGLE_PRODUCT_REDIRECT_CONSTANTS
} from "../interfaces/~constants";
import {ProductContext} from "../provider/~context";

const useCreateProductScroll = () => {
  const {pageState, pageDispatch} = useContext(ProductContext)
  const listScrollForm = pageState?.formCreate?.statusForm === 'create'
                        ? CREATE_PRODUCT_REDIRECT_CONSTANTS :
                        (pageState?.formCreate?.statusForm === 'editSingleVersion'
                        ? EDIT_SINGLE_PRODUCT_REDIRECT_CONSTANTS : EDIT_MULTIPLE_PRODUCT_REDIRECT_CONSTANTS)
  const [listTitle, setListTitle] = useState(listScrollForm)

  const scrollToItem = (id, location) => {
    const wrapper = document.querySelector('#content-wrap')
    wrapper.scrollTo({
      top: location,
      behavior: "smooth"
    })
    setListTitle(listTitle.map(item => {
      item.active = item.id === id
      return item
    }))
  }

  return {
    value: {
      listTitle
    },
    functions: {
      scrollToItem,
    },
  }
};

export default useCreateProductScroll;