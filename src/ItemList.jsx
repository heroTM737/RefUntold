import Confirm from "./Confirm";
import {useRef} from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function ItemList (props) {
    const {items, onClickItem} = props;
    const confirmRef = useRef(null);

    const onDelete = async (i) => {
        let item = items[i]
        let confirmed = await confirmRef.current.open(
            <>Do you want to delete: <b>{item.name}</b></>
        )
        if (confirmed) {
            console.log('do delete ' + item.name)
        }
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
        </div>
    )
}

export default ItemList;
