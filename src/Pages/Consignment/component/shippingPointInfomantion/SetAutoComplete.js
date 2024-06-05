import React from 'react'
import { ADDRESS_ICONS } from 'Pages/addressSeparationTool/_icons'
import { Autocomplete, TextField } from '@mui/material'
import { StyledOption } from 'Pages/addressSeparationTool/fileId/components/table/_styled'
export default function SetAutoComplete({ ...props }) {
    const {options,name,handleChange,keyDown,placeholder,valid,error,classes,disable,refs}=props
    return (
        <div className='p-consingment__autocomplete'>
            <Autocomplete
                className={classes}
                disableClearable={true}
                disabled={disable}
                noOptionsText="Không có kết quả"
                // open={true}
                options={options}
                popupIcon={ADDRESS_ICONS.arrowDown}
                value={name}
                componentsProps={{ paper: { sx: { minWidth: 200 } } }}
                getOptionLabel={option => option}
                onChange={(e, val) => {
                    handleChange(val)
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        inputRef={refs}
                        onKeyDown={keyDown}
                        inputProps={{ ...params.inputProps }}
                        placeholder={placeholder}
                        className="text_field"
                        autoComplete={'off'}
                    />
                )}
                renderOption={(props, option) => (
                    <StyledOption {...props}>{option}</StyledOption>
                    // <li className='autocomplete__address-selected' {...props}>{option}</li>
                )}
            />
            {valid == true && (
                <span className="error_message">
                    {error}
                </span>
            )}
        </div>
    )
}
