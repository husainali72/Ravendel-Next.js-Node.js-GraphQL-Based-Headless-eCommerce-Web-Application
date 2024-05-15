


import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
export default function DialogBox({ open, handleSubmit, errors, register, onSubmit, buttonTitle, handleClose, value, name, label, title, onInputChange }) {
    const [state, setstate] = useState('')
    useEffect(() => {
        setstate(value)
    }, [value])
    return (
        <div>

            <Dialog
                fullWidth={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ ml: '5px' }}>
                    {title}
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent >

                        <TextField
                            type="text"
                            value={value}
                            label={label}
                            name={name}
                            variant="outlined"
                            fullWidth
                            sx={{ mt: '10px' }}
                            {...register("zip", {
                                required: {
                                    value: (value ? false : true),
                                    message: "zip code is required",
                                },
                                pattern: {
                                    value: /^\S{4,}$/,
                                    message: "Invalid Zipcode",
                                },
                            })}
                            error={errors.value ? true : false}
                            onChange={onInputChange}
                        />
                        <p>
                            <small style={{ color: 'red' }}>
                                {errors.zip?.type === "required" ? errors.zip?.message : ''}
                                {errors.zip?.type === "pattern" ? errors.zip?.message : ''}
                            </small>
                        </p>

                    </DialogContent>
                    <DialogActions>

                        <Button onClick={handleClose} color='error'>cancel</Button>
                        <Button type='submit' variant='contained' color='primary' autoFocus>
                            {buttonTitle}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div >
    );
}

