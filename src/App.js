import './App.scss';
import ItemList from "./ItemList";
import ItemEditor from "./ItemEditor";
import { useRef } from "react";

function generateData() {
    let itemList = [];
    for (let i = 0; i < 10; i++) {
        itemList.push({
            id: i,
            name: `item-${i},`,
            description: 'a good one',
            created_at: '20-10-2022 14:00:00'
        })
    }
    return itemList;
}

function App() {
    const ItemEditorRef = useRef(null);
    let items = generateData();

    const onClickItem = item => {
        ItemEditorRef.current.open(item)
    }

    return (
        <div className="App">
            <div className={'panel-left'}>
                <ItemList
                    items={items}
                    onClickItem={onClickItem}
                />
            </div>
            <div className={'panel-right'}>
                <ItemEditor ref={ItemEditorRef} />
            </div>
        </div>
    );
}

export default App;
