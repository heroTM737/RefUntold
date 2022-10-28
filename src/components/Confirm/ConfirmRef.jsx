import {forwardRef, useImperativeHandle, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

function ConfirmRef (props, ref) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [promiseCallback, setPromiseCallback] = useState(null);

    // console.log('render ConfirmRef')

    const onConfirm = () => {
        promiseCallback.resolve(true)
        setVisible(false)
    }

    const onCancel = () => {
        promiseCallback.resolve(false)
        setVisible(false)
    }

    useImperativeHandle(ref, () => ({
        open (message) {
            setMessage(message);
            setVisible(true);
            return new Promise((resolve, reject) => {
                setPromiseCallback({resolve, reject})
            })
        }
    }))

    return (
        <Dialog open={visible} onClose={onCancel}>
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
                {message}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} variant="outlined">Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default forwardRef(ConfirmRef)
