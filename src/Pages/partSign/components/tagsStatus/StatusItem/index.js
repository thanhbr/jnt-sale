import React from 'react'
import { fNumber } from 'util/formatNumber'

const StatusItem = ({item, index, active, handleChangeStatus = () => {}}) => {
  const handleClick = () => {
    handleChangeStatus(item)
  }

  return (
    <div className="d-tags-status__list" key={index}>
        <p className={(index === 0 ? 'd-tags-status__title-600' : 'd-tags-status__title-500') + (active === item.id ? ' d-tags-status__name-green' : '')} onClick={handleClick}>{item.name}</p>
        {item.sub_arr?.length > 0 && <div className={"d-tags-status__icon-arr"}><img src="/svg/arr-down.svg" alt='arr-down'/></div>}
        <div className={ active === item.id ? 'd-tags-status__box-green' : 'd-tags-status__box-gray'}>{fNumber(item.total)}</div>
    </div>
  )
}

export default StatusItem