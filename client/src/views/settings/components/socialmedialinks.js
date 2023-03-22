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
import { useDispatch } from 'react-redux';
const Image = React.memo(function Image({ src }) {
    const error = React.memo(function imageOnError(event) {
        event.target.src = NoImagePlaceHolder
    })
    return src.icon ? <img src={src.icon.startsWith("blob") ? src.icon : (bucketBaseURL + src.icon)} className="mobileImage" /> : <p>{src.name}</p>
});
const SocialMediaComponent = ({ addIconButton, handleChange, selectedIcons, removeInput, handleImageChange, menuItem, onhandleChange }) => {
    const classes = viewStyles()
    const dispatch = useDispatch()
    const checkSelectedIcons = (Icons) => {
        return selectedIcons.some((item) => {
            return item.name === Icons.name;
        });
    };
    const [addIconName, setAddIconName] = useState(false)
    const [icon, setIconName] = useState({
        iconName: '',
        iconImage: ''
    })
    const AddIconButton = () => {
        if (icon.iconName && icon.iconImage) {
            setAddIconName(false)
            addIconButton(icon)
            setIconName('')
        }
        else dispatch({
            type: ALERT_SUCCESS,
            payload: {
                boolean: false,
                message: !icon.iconName ? "Media name is required" : `${icon.iconName} image is required`,
                error: true,
            },
        })
    }
    const imageOnError = (event) => {
        event.target.src = NoImagePlaceHolder
    }
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
                                    < Box className={classes.iconLogoBox} >
                                        <Image
                                            src={value}
                                        />

                                    </Box>
                                ))}
                            </div>
                        )
                        }
                        MenuProps={MenuProps}
                        fullWidth
                    >
                        {children}
                    </Select >
                </FormControl >
                <Button color='primary' variant='contained' sx={{ m: '10px' }} onClick={() => setAddIconName(true)}>Add Icon</Button>

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
                    < Box className={classes.iconLogoBox} >
                        <Image
                            src={iconName}
                        />
                    </Box>
                    <span style={{ marginLeft: '20px' }}>{iconName.name}</span>
                </MenuItem>)
                ) : <p style={{ textAlign: 'center', margin: '10px' }}>
                    Add New Icon
                </p>}
            </SelectOptionField>
            {addIconName ?
                <div className={classes.container}>
                    <div className={classes.divContainer} >
                        <div className={classes.iconDiv}>
                            <label htmlFor='htmltag'>
                                {icon.iconImage ? (
                                    <Box className={classes.iconLogoBox}>
                                        <img
                                            className="mobileImage"
                                            src={icon.iconImage.startsWith("blob") ? icon.iconImage : (bucketBaseURL + icon.iconImage)}
                                            onError={imageOnError}
                                        />
                                    </Box>
                                ) : (
                                    <Box className={classes.iconLogoBox}>
                                        <h6 className={classes.socialMediaIcon}><AddPhotoAlternateIcon color="action" sx={{ fontSize: '30px' }} /></h6>
                                    </Box>
                                )}
                            </label>
                            <input
                                key='index'
                                name='iconImage'
                                type="file"
                                accept="image/*"
                                id='htmltag'
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    setIconName({ ...icon, iconImage: URL.createObjectURL(e.target.files[0]), updateIconImage: e.target.files })
                                }}
                            />
                        </div>
                        <input
                            aria-invalid="false"
                            id=":rj:"
                            name="iconName"
                            placeholder='Add Icon Name'
                            type="tel"
                            className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedStart css-e7hdwz-MuiInputBase-input-MuiOutlinedInput-input"
                            value={icon.iconName}
                            onChange={(e) => setIconName({ ...icon, [e.target.name]: e.target.value })} />
                    </div>
                    <div className={classes.AddIconDiv} >
                        <Button variant='contained' color='primary' className={classes.AddIconButton} onClick={AddIconButton}><AddIcon /></Button>
                        <Button color='error' className={classes.AddIconButton} onClick={() => setAddIconName(false)}><CloseIcon /></Button>
                    </div>
                </div>
                : null}
            {selectedIcons && selectedIcons.length > 0 ? selectedIcons.map((icon, index) => {
                return (
                    <div className={classes.container}>
                        <div className={classes.divContainer}>
                            <div className={classes.iconDiv}>
                                <label htmlFor={`htmltag${index}`}>
                                    {icon.icon ? (
                                        <Box className={classes.iconLogoBox}>
                                            <img
                                                className="mobileImage"
                                                src={icon.icon.startsWith("blob") ? icon.icon : (bucketBaseURL + icon.icon)}
                                                onError={imageOnError}
                                            />

                                        </Box>
                                    ) : (
                                        <>
                                            <Box className={classes.iconLogoBox}>
                                                <h6 className={classes.socialMediaIcon}><AddPhotoAlternateIcon color="action" sx={{ fontSize: '30px' }} /></h6>
                                            </Box>
                                        </>)}
                                </label>
                                <input
                                    key={index}
                                    type="file"
                                    accept="image/*"
                                    id={`htmltag${index}`}
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageChange(e, index)}
                                />
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
                        {!icon.system ?
                            <Stack direction="row" spacing={1}>
                                <IconButton color="error" aria-label="delete" onClick={() => removeInput(index)}>
                                    <CloseIcon sx={{ m: '20px' }} />
                                </IconButton>
                            </Stack> : null}
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
