/**
 *
 * custom select for order v 1.0
 * by kynk - copyright 2020
 *
 */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useImperativeHandle,
} from 'react'
import Paper from '@material-ui/core/Paper'
import {useTranslation} from 'react-i18next'

let timeout

export default function SearchInput({...props}) {
  const {
    listOption = {},
    callBack = () => {},
    onUserBlur = () => {},
    id = '',
    customClass = '',
    showSelected = true,
    stringQuerry = '',
    selected = {},
    PlaceHolderText = '',
    suggestText = {},
    customBg = '',
    keyword = '',
    updateRef,
    isHideSuggest = false,
    clearText = () => {},
    dataResult = [],
    RenderItemResult = () => {},
    callBackClickItem = () => {},
  } = props

  const [showSuggest, changeShowSuggest] = useState(false)
  const [value, changeValue] = useState(null)
  const ref1 = useRef(null)
  const {t} = useTranslation()
  // console.log('----------kyn render input search ------')
  const changeText = e => {
    const text = e.target.value
    // callBack && callBack(text);
    // changeValue(text)
    // if (timeout) {
    //   clearTimeout(timeout);
    // }
    // timeout = setTimeout(() => {
    callBack && callBack(text)
    // }, 300);
  }
  const didmout = () => {
    // if (updateRef) {
    //   updateRef(this);
    // }

    document.addEventListener('mousedown', handleClickOutside)
  }
  const unmount = () => {
    // updateRef();
    document.removeEventListener('mousedown', handleClickOutside)
  }

  function handleClickOutside(event) {
    if (ref1.current && !ref1.current.contains(event.target)) {
      changeShowSuggest(false)
    }
  }
  function clearValue() {
    changeValue('')
  }
  useEffect(() => {
    didmout()
    return () => {
      unmount()
    }
  }, [])
  useEffect(() => {
    clearValue()
  }, [stringQuerry])
  // console.log('---------- render input search ------')
  const RenderResult = () => {
    if (dataResult && dataResult.length) {
      return dataResult.map((item, index) => RenderItemResult(item, index))
    } else {
      return (
        <>
          <div className="upos-text suggest-1">
            {t(suggestText.des || '--')}
          </div>
          <div className="upos-text suggest-2">{t('suggest_for_you')}</div>
          <div className="upos-text suggest-3">
            <div className="upos-text upos-bold example-1">
              {suggestText.ex1 || '--'}
            </div>
            <div className="upos-text upos-bold example-2">
              {suggestText.ex2 || '--'}
            </div>
          </div>
        </>
      )
    }
  }
  try {
    return (
      <div
        ref={ref1}
        className={customClass ? `${customClass} search-box` : 'search-box'}
      >
        <div className="input-search-wrapper">
          <input
            id={id}
            onChange={e => {
              changeText(e)
            }}
            onClick={() => {
              if (value || stringQuerry) {
                changeShowSuggest(true)
              } else {
                changeShowSuggest(!showSuggest)
              }
            }}
            value={value || stringQuerry}
            className={`${customBg} upos-text upos-input-search`}
            spellCheck={false}
            placeholder={t(PlaceHolderText)}
            onBlur={() => {
              onUserBlur(value)
            }}
          />
          {isHideSuggest
            ? null
            : typeof suggestText === 'object' && (
                <Paper
                  style={{width: '330px'}}
                  className={
                    showSuggest
                      ? 'suggest-wrapper upos-show-item'
                      : 'suggest-wrapper upos-hide-item'
                  }
                  elevation={1}
                >
                  {RenderResult()}
                </Paper>
              )}
        </div>
      </div>
    )
  } catch (error) {
    console.log('error render search box')
  }
}
