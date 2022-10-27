import './App.scss';
import ItemList from "./Item/ItemList";
import ItemEditor from "./Item/ItemEditor";
import { useRef } from "react";

function App() {
    const ItemEditorRef = useRef(null);

    const openItemEditor = async item => {
        return ItemEditorRef.current.open(item)
    }

    return (
        <div className="App">
            <div className={'panel-left'}>
                <ItemList
                    openItemEditor={openItemEditor}
                />
            </div>
            <div className={'panel-right'}>
                <ItemEditor ref={ItemEditorRef} />
            </div>
        </div>
    );
}

export default App;
