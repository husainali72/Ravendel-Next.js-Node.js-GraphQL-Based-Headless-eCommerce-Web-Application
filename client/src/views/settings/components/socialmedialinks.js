import React, { useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    Stack
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { bucketBaseURL } from '../../../utils/helper.js';
import viewStyles from '../../viewStyles.js';
import { MenuProps } from '../../coupon/coupon-components/index.js';
import NoImagePlaceHolder from "../../../assets/images/NoImagePlaceHolder.png";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddIcon from '@mui/icons-material/Add';
import { ALERT_SUCCESS } from '../../../store/reducers/alertReducer.js';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch } from 'react-redux';
export const socialMediaIconSetter = (IconName, setIcon,) => {
    if (IconName === "facebook") return <FacebookIcon sx={{ color: 'blue', m: '5px' }} />
    if (IconName === "instagram") return <InstagramIcon sx={{ color: 'pink', m: '5px' }} />
    if (IconName === "youtube") return <YouTubeIcon sx={{ color: 'red', m: '5px' }} />
    if (IconName === "twitter") return <TwitterIcon sx={{ color: 'skyblue', m: '5px' }} />
}
const SocialMediaComponent = ({ handleChange, selectedIcons, removeInput, menuItem, onhandleChange }) => {
    const classes = viewStyles()
    const dispatch = useDispatch()
    const checkSelectedIcons = (Icons) => {
        return selectedIcons.some((item) => {
            return item.name === Icons.name;
        });
    };
    const SelectOptionField = ({ label, name, value, children, id }) => {
        return (
            <>
                <FormControl
                    sx={{ width: '300px', minWidth: 10, }}
                >
                    <InputLabel id={id} >{label}</InputLabel>
                    <Select
                        label='label'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        multiple
                        onChange={(e) => onhandleChange(e)}
                        className={classes.iconSelect}
                        value={value}
                        name={name}
                        renderValue={(selected) => (
                            <div style={{ display: "flex", flexWrap: "wrap", }} >
                                {selected.map((value) => (
                                    socialMediaIconSetter(value.name)))}
                            </div>
                        )
                        }
                        MenuProps={MenuProps}
                        fullWidth
                    >
                        {children}
                    </Select >
                </FormControl >
            </>
        );
    };
    return (
        <>
            <SelectOptionField
                name="name"
                label="Links"
                value={selectedIcons}
                id="products"
            >
                {menuItem.length > 0 ? menuItem.map((iconName, index) =>
                (< MenuItem value={iconName} key={iconName.name} disabled={checkSelectedIcons(iconName)}>
                    {socialMediaIconSetter(iconName.name)}
                    <span style={{ marginLeft: '20px' }}>{iconName.name}</span>
                </MenuItem>)
                ) : null}
            </SelectOptionField>

            {selectedIcons && selectedIcons.length > 0 ? selectedIcons.map((icon, index) => {
                return (
                    <div className={classes.container}>
                        <div className={classes.divContainer}>
                            <div className={classes.iconDiv}>
                                {socialMediaIconSetter(icon.name)}
                            </div>
                            <input
                                aria-invalid="false"
                                id=":rj:"
                                name={icon}
                                placeholder={`${icon.name.charAt(0).toUpperCase() + icon.name.slice(1)} Link`}
                                type="tel"
                                className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedStart css-e7hdwz-MuiInputBase-input-MuiOutlinedInput-input"
                                value={icon.handle}
                                onChange={(e) => handleChange(e, index)} />
                        </div >
                        <Stack direction="row" spacing={1}>
                            <IconButton color="error" aria-label="delete" onClick={() => removeInput(index)}>
                                <CloseIcon sx={{ m: '20px' }} />
                            </IconButton>
                        </Stack>
                    </div>
                )
            }) : null
            }
        </>
    );
}
export default function SocialMedia({ handleChange, addIconButton, onhandleChange, selectedIcons, socialMedia, addInput, removeInput, handleImageChange, menuItem }) {
    return (
        <ThemeProvider theme={theme}>
            <SocialMediaComponent
                handleChange={handleChange}
                selectedIcons={selectedIcons}
                handleImageChange={handleImageChange}
                removeInput={removeInput}
                menuItem={menuItem}
                addIconButton={addIconButton}
                onhandleChange={onhandleChange} />
        </ThemeProvider>
    );
}
