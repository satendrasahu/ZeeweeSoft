import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value,error=null, onChange , tabindex,disabled} = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            size="small"
            onChange={onChange}
            autoComplete='off'
            disabled={disabled}
            {...(error && {error:true,helperText:error})}
            inputProps={{ tabIndex: tabindex }}
        />
    )
}
