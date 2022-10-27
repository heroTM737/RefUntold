import Confirm from "../Confirm/ConfirmRef";
import ConfirmNormal from "../Confirm/ConfirmNormal";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ItemService from "../../services/ItemService";

function ItemList(props) {
    const { openItemEditor } = props;
    const confirmRef = useRef(null);
    const [items, setItems] = useState([])
    const [confirmItem, setConfirmItem] = useState(null)
    const [visibleConfirm, setVisibleConfirm] = useState(false)

    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = () => {
        ItemService.search().then(data => setItems(data))
    }

    const doDelete = (id) => {
        ItemService.delete(id).then(() => onRefresh())
    }

    const onDelete = async (i) => {
        let item = items[i]

        // method 1 - using confirm ref
        // let confirmed = await confirmRef.current.open(
        //     <>Do you want to delete: <b>{item.name}</b></>
        // )
        // if (confirmed) {
        //     doDelete(item.id)
        // }

        // method 2 - using normal confirm
        setVisibleConfirm(true)
        setConfirmItem(item)
    }

    const onConfirmed = () => {
        setVisibleConfirm(false)
        doDelete(confirmItem.id)
    }

    const onRejected = () => {
        setVisibleConfirm(false)
    }

    const onClickItem = async (item) => {
        try {
            let newItem = await openItemEditor(item)
            await ItemService.update(item.id, newItem)
            onRefresh()
        } catch (e) {
            throw e
        }
    }

    let itemCompList = items.map((item, i) => (
        <tr key={item.id} onClick={() => onClickItem(item)}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.created_at}</td>
            <td>
                <div
                    onClick={e => {
                        e.stopPropagation()
                        onDelete(i)
                    }}
                >
                    <DeleteIcon />
                </div>
            </td>
        </tr>
    ));

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {itemCompList}
                </tbody>
            </table>
            <Confirm ref={confirmRef} />
            <ConfirmNormal
                message={<>Do you want to delete: <b>{confirmItem?.name}</b></>}
                visible={visibleConfirm}
                onConfirmed={onConfirmed}
                onRejected={onRejected}
            />
        </div>
    )
}

export default ItemList;
