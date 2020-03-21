const removeItem = () => {
    return {
        type: "REMOVE",
    }
}

const addItem = (payload) => {
    return {
        type: "ADD",
        payload
    }
}

const clear = () => {
    return {
        type: "CLEAR",
    }
}

module.exports = {
    removeItem,
    addItem,
    clear
}