import Confirm from "./Confirm/ConfirmRef";
import ConfirmNormal from "./Confirm/ConfirmNormal";
import {useRef, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function ItemList (props) {
    const {items, onClickItem} = props;
    const confirmRef = useRef(null);

    const [confirmItem, setConfirmItem] = useState(null)
    const [visibleConfirm, setVisibleConfirm] = useState(false)

    const onDelete = async (i) => {
        let item = items[i]

        // method 1 - using confirm ref
        // let confirmed = await confirmRef.current.open(
        //     <>Do you want to delete: <b>{item.name}</b></>
        // )
        // if (confirmed) {
        //     console.log('do delete ' + item.name)
        // }

        // method 2 - using normal confirm
        setVisibleConfirm(true)
        setConfirmItem(item)
    }

    const onConfirmed = () => {
        setVisibleConfirm(false)
        console.log('do delete ' + confirmItem.name)
    }

    let itemCompList = items.map((item, i) => (
        <tr key={item.id} onClick={() => onClickItem(item)}>
            <td>{item.name}</td>
            <td>{item.created_at}</td>
            <td>
                <div
                    onClick={e => {
                        e.stopPropagation()
                        onDelete(i)
                    }}
                >
                    <DeleteIcon/>
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
                    <th>Created Time</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {itemCompList}
                </tbody>
            </table>
            <Confirm ref={confirmRef}/>
            <ConfirmNormal
                message={<>Do you want to delete: <b>{confirmItem?.name}</b></>}
                visible={visibleConfirm}
                onConfirmed={onConfirmed}
            />
        </div>
    )
}

export default ItemList;
