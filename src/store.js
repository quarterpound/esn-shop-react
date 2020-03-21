const initalState = [];

const rootReducer = (state = initalState, action) => {
    switch(action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "REMOVE":
            break;
        case "CLEAR":
            return [];
        default:
            return state;
    }
}

export default rootReducer