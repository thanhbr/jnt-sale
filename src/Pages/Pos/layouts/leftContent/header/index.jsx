import { AutocompleteSearch } from '../../../component/autocompleteSearch'
import styled from 'styled-components'
import { usePosSearchBox } from '../../../hooks/usePosSearchBox'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const HeaderRightPos = () => {
  const { data } = usePosSearchBox()
  const barcodeRef = useRef()
  const barcodeInputRef = useRef()
  const handleClickOutside = (event) => {
    if (!barcodeRef.current) return
    if (barcodeRef.current && !barcodeRef.current.contains(event.target)) {
      data.barcode.onChange(false)
    }
  }
  const handleKeyboard = (event) => {
    if (!!event.keyCode && event.keyCode > 111 && event.keyCode !== 114){
      data.barcode.onChange(false)
    }
    else if (!!event.keyCode && event.keyCode == 114) {
      event.preventDefault()
      data.barcode.onChange(true)
    }

  }
  useEffect(() => {
    // Bind the event listener
    if (!!barcodeInputRef.current) {
      barcodeInputRef.current.focus()
      barcodeInputRef.current.click()
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyboard)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [data.barcode.status])

  const nav = useNavigate()
  const handleLeavePage = _ => {
    if(!!data?.statusUpdate) data?.leaveModal?.onDisplay(true)
    else nav('/admin')
  }
  return (
    <StyleHeaderRight>
      <div className={'pos-logo'}>
        <p onClick={handleLeavePage}>
          <img src="img/logo-thumb.png" alt=""/>
        </p>
      </div>
      <AutocompleteSearch/>
      <div ref={barcodeRef} className={`pos-barcode pos-barcode-${!!data.barcode.status ? 'active' : 'deactive'}`}
           onClick={() => data.barcode.onChange(!data.barcode.status)}>
        {!!data.barcode.status
          ?
          <>
            <img src="img/pos/barcode-active.png" alt=""/>
            <input ref={barcodeInputRef} onChange={e => data.barcode.onInputChange(e.target.value)}
                   value={data.barcode.value}
                   onClick={e => e.stopPropagation()} style={{ opacity: 0, position: 'absolute' }}/>
          </>
          :
          <img src="img/pos/barcode.png" alt=""/>
        }
      </div>
    </StyleHeaderRight>
  )
}

const StyleHeaderRight = styled.div`
  display: flex;
  align-items: center;
  .category-input__menu{
    height: 300px;
    overflow: auto;
  }
  .pos-logo{
    width: 32px;
    height: 32px;
    margin-right: 16px;
    cursor: pointer;
  }
  .pos-barcode{
    display: flex;
    margin-left: 16px;
    cursor: pointer;
  }
  .alternative-auto-complete__menu{
    padding: 16px 0!important;
  }
  .pos-order-filter-form__input-wide{
    width: calc( 100% - 76px);
  }
  .pos-product-search-list {
    &[data-hover=true]{
      
      background: rgb(243, 246, 252);
      .pos-product-search-list__name{
        span{
          color: #1A94FF!important;
        }
      }
    }
    :hover{
         
      background: rgb(243, 246, 252);
      .pos-product-search-list__name{
        span{
          color: #1A94FF!important;
        }
      }
    }
    &__loading {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__load-more {
      padding: 16px 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__item {
 
      padding: 8px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      cursor: pointer;

      width: 100%;
      
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__banner {
      width: 48px;
      height: 48px;
      margin-right: 16px;

      overflow: hidden;

      border-radius: 4px;

      img {
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center;
      }
    }

    &__info {
      flex: 1;
    }

    &__name {
      display: flex;
      justify-content: space-between;
    }

    &__empty {
      min-height: 300px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`