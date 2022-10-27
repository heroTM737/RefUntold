import './ItemEditor.scss'
import { forwardRef, useImperativeHandle, useState } from "react";
import { TextField } from "@mui/material";

const defaultFormData = {
    name: '',
    description: ''
}

function ItemEditor(props, ref) {
    const [promiseCallback, setPromiseCallback] = useState(null)
    const [item, setItem] = useState(null)
    const [formData, setFormData] = useState(defaultFormData)
    const [visible, setVisible] = useState(false)

    const onSave = () => {
        promiseCallback.resolve(formData)
        setVisible(false)
    }

    const onCancel = () => {
        promiseCallback.reject(null)
        setVisible(false)
    }

    const onChange = (e, field) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        })
    }

    useImperativeHandle(ref, () => ({
        open: (item = null) => {
            setItem(item)
            setFormData({
                name: item.name,
                description: item.description
            })
            setVisible(true)
            return new Promise((resolve, reject) => {
                setPromiseCallback({ resolve, reject });
            })
        }
    }))

    if (!visible) {
        return null
    }

    const isChanged = item.name !== formData.name || item.description !== formData.description

    return (
        <div className={'ItemEditor panel'}>
            <div className={'panel-header'}>
                Edit Item
            </div>
            <div className={'panel-body'}>
                <div className={'form-item-wrapper'}>
                    <TextField
                        required
                        size="small"
                        label="Name"
                        value={formData.name}
                        onChange={e => onChange(e, 'name')}
                    />
                </div>
                <div className={'form-item-wrapper'}>
                    <TextField
                        size="small"
                        label="Description"
                        value={formData.description}
                        onChange={e => onChange(e, 'description')}
                    />
                </div>
            </div>
            <div className={'panel-footer'}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onSave} disabled={!isChanged}>Save</button>
            </div>
        </div>
    )
}

export default forwardRef(ItemEditor);