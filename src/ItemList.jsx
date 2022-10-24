function ItemList(props) {
    const { items, onClickItem } = props;

    let itemCompList = items.map(item => (
        <tr key={item.id} onClick={() => onClickItem(item)}>
            <td>{item.name}</td>
            <td>{item.created_at}</td>
        </tr>
    ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Created Time</th>
                </tr>
            </thead>
            <tbody>
                {itemCompList}
            </tbody>
        </table>
    )
}

export default ItemList;