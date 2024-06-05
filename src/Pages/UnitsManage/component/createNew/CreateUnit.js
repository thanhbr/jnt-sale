import './index.scss'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {SwitchStatus} from 'Component/SwitchStatus/SwitchStatus'
import React from 'react'

export default function CreateUnit({data, setData}) {
  
  const {unit_name, unit_short_name, status} = data
  const handleChange = e => {
    let {value, name} = e.target
    if (name === 'status') value = e.target.checked ? "1" : "-1"

    let errorMessage = ''
    let isValid = true

    switch (name) {
      case 'unit_name':
        errorMessage = 'Đơn vị tính'
        break;
      case 'unit_short_name':
        errorMessage = 'Ký hiệu đơn vị tính'
        break;
      default: 
    }

    if (value === '') {
      isValid = false
      errorMessage += ' không được bỏ trống.'
    } else if (value.length > 100) {
      isValid = false
      errorMessage += " không được lớn hơn 100 ký tự"
    }

    setData(prev => ({...prev, [name]: {...prev[name], value, isValid, errorMessage}}))
  }

  return (
    <div className="units-manage">
      <div className="units-manage-header">
        <Text
          as={'p'}
          color={THEME_COLORS.gray_300}
          fontSize={20}
          fontWeight={600}
          lineHeight={28}
        >
          Thông tin đơn vị tính
        </Text>
        <Text
          as={'p'}
          color={THEME_COLORS.gray_300}
          fontSize={15}
          fontWeight={400}
          lineHeight={21}
          className="unit__create-p"
        >
          “Sử dụng để định nghĩa đơn vị tính cho sản phẩm!”
        </Text>
      </div>
      <div className="units-manage-body">
        <div className="units-manage-note">
          <div className="units-manage-question">
            <Text
              as={'p'}
              color={THEME_COLORS.gray_300}
              fontSize={14}
              fontWeight={400}
              lineHeight={19.6}
            >
              Đơn vị tính <span>*</span>
            </Text>
          </div>
          <input
            name="unit_name"
            placeholder="Nhập đơn vị tính"
            className={
              unit_name && !unit_name.isValid
                ? 'units-manage-positionInput error_border'
                : 'units-manage-positionInput'
            }
            defaultValue={unit_name ? unit_name.value : ''}
            onChange={handleChange}
            onBlur={handleChange}
          />
          {unit_name && !unit_name.isValid && (
            <p className="units-manage-error">
               {unit_name.errorMessage}
            </p>
          )}
        </div>
        <div className="units-manage-position">
          <div className="units-manage-question">
            <Text
              as={'p'}
              color={THEME_COLORS.gray_300}
              fontSize={14}
              fontWeight={400}
              lineHeight={19.6}
            >
              Ký hiệu đơn vị tính <span>*</span>
            </Text>
          </div>
          <input
            name="unit_short_name"
            placeholder="Nhập ký hiệu đơn vị tính"
            className={
              unit_short_name && !unit_short_name.isValid
                ? 'units-manage-positionInput error_border'
                : 'units-manage-positionInput'
            }
            defaultValue={unit_short_name ? unit_short_name.value : ''}
            onChange={handleChange}
            onBlur={handleChange}
          />
          {unit_short_name && !unit_short_name.isValid && (
            <p className="units-manage-error">
              {unit_short_name.errorMessage}
            </p>
          )}
        </div>
        <div className="units-manage-status">
          <SwitchStatus name='status' status={status.value === '1'} handleChange={handleChange} />
          <Text
            className="units-manage-statusText"
            color={THEME_COLORS.gray_300}
            fontSize={14}
            fontWeight={400}
          >
            Kích hoạt/Ngưng sử dụng
          </Text>
        </div>
      </div>
    </div>
  )
}
