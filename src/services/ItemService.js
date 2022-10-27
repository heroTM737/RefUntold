const itemList = [];
for (let i = 0; i < 10; i++) {
    itemList.push({
        id: i,
        name: `item-${i}`,
        description: 'a good one',
        created_at: '20-10-2022 14:00:00'
    })
}

const ItemService = {
    search() {
        return Promise.resolve(JSON.parse(JSON.stringify(itemList)));
    },

    update(id, data) {
        let item = itemList.find(item => item.id === id)
        item.name = data.name
        item.description = data.description
        return Promise.resolve(item)
    },

    delete(id) {
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].id === id) {
                itemList.splice(i, 1)
            }
        }
        return Promise.resolve()
    }
}

export default ItemService