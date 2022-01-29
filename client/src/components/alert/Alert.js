import React from 'react';
import {Alert as MuiAlert} from '@mui/material';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';

export const Alert = ({text, color, style}) => {
    if (color == 'green') {
        return <MuiAlert icon={<GlobalSvgSelector id='ok'/>} sx={Object.assign({color: 'black', backgroundColor: '#E1FFE6'}, style)}>{text}</MuiAlert>
    } 
    else if (color == 'yellow') {
        return <MuiAlert icon={<GlobalSvgSelector id='warning'/>} sx={Object.assign({color: 'black', backgroundColor: '#FFFADC'}, style)}>{text}</MuiAlert>
    }
    else if (color == 'red') {
        return <MuiAlert icon={<GlobalSvgSelector id='wrong'/>} sx={Object.assign({color: 'black', backgroundColor: '#FFE6E6'}, style)}>{text}</MuiAlert>
    }
    return <MuiAlert icon={<GlobalSvgSelector id='info'/>} sx={Object.assign({color: 'black', backgroundColor: '#E6F5FA'}, style)}>{text}</MuiAlert>
}