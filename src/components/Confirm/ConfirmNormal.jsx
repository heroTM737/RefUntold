import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

function ConfirmNormal (props) {
    const {visible, message, onConfirmed, onRejected} = props

    console.log('render ConfirmNormal')

    return (
        <Dialog open={visible} onClose={onRejected}>
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
                {message}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onRejected?.()}>Cancel</Button>
                <Button variant="outlined" onClick={onConfirmed}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmNormal
