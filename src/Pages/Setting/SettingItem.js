import React from 'react'
import { Link } from 'react-router-dom'
import { SETTING } from 'Component/Icons'
import { Text } from 'common/text'
import { Tooltip } from 'common/tooltip'
export default function SettingItem(props) {
  return (
    <>
      {props.url ? <Link to={props.url}>
        <div className="p-setting__about-box">
          <img
            src={props.imageURL}
            alt="icon-setting1"
            className="p-setting__icon-setting"
          />
          <div className="p-setting__about-box-content">
            <div className='p-setting__group-text'>
              <Text color={'#00081D'} fontSize={16} >{props.title} </Text>
              <Link to={props.url} className="p-setting__about-link">
                {SETTING.detail}
              </Link>
            </div>
            <span className="p-setting__aboout-description">
              {props.description}
            </span>
          </div>
        </div>
      </Link> : <Tooltip placement="center" title={'Tính năng đang phát triển'} ><div className="p-setting__about-box">
        <img
          src={props.imageURL}
          alt="icon-setting1"
          className="p-setting__icon-setting"
        />
        <div className="p-setting__about-box-content">
          <div className='p-setting__group-text'>
            <Text color={'#00081D'} fontSize={16} >{props.title} </Text>
              <Link to={props.url} className="p-setting__about-link">
                {SETTING.detail}
              </Link>
          </div>
          <span className="p-setting__aboout-description">
            {props.description}
          </span>
        </div>
      </div></Tooltip>}
    </>
  )
}

