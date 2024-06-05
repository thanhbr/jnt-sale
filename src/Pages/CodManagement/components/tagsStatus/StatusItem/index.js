import React, { useEffect, useState } from 'react'
import { fNumber } from 'util/formatNumber'
import {useTranslation} from "react-i18next";
const StatusItem = ({item, index, active, handleChangeStatus = () => {}}) => {
  const handleClick = () => {
    handleChangeStatus(item)
  }

  return (
    <div className="d-tags-cod-status__list" key={index}>
        <p className={(index === 0 ? 'd-tags-cod-status__title-600' : 'd-tags-cod-status__title-500') + (active === item.id ? ' d-tags-cod-status__name-green' : '')} onClick={handleClick}>{item.name}</p>
        {item.sub_arr?.length > 0 && <div className={"d-tags-cod-status__icon-arr"}><img src="/svg/arr-down.svg" alt='arr-down'/></div>}
        <div className={ active === item.id ? 'd-tags-cod-status__box-green' : 'd-tags-cod-status__box-gray'}>{fNumber(item.total)}</div>
    </div>
  )
}

export default StatusItem