import './ItemEditor.scss'
import { forwardRef, useImperativeHandle, useState } from "react";

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

    return (
        <div className={'ItemEditor panel'}>
            <div className={'panel-header'}>
                Edit Item
            </div>
            <div className={'panel-body'}>
                {JSON.stringify(item)}
            </div>
            <div className={'panel-footer'}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onSave}>Save</button>
            </div>
        </div>
    )
}

export default forwardRef(ItemEditor);