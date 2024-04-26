
import React from 'react';
import Tooltip from '@mui/joy/Tooltip';
import IconButton from '@mui/joy/IconButton';
import InfoIcon from '@mui/icons-material/Info';


export default function InfoTooltip({title}) {
    return (
        <Tooltip title={title || "?"} placement="top" size="sm">
          <IconButton  sx={{"--Button-gap": "11px", "--IconButton-size": "20px"}}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
    )
}