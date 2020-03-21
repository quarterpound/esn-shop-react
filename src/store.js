import Cookie from 'universal-cookie';
const cookie = new Cookie();

const initalState = cookie.get("cart") || [];

const rootReducer = (state = initalState, action) => {
    switch(action.type) {
        case "ADD":
            cookie.set("cart", [action.payload, ...state], {path: "/"});
            return [action.payload, ...state];
        case "REMOVE":
            cookie.set("cart", state.filter((t, i) => {return i !== action.payload}), {path: "/"});
            return state.filter((t, i) => {return i !== action.payload});
        case "CLEAR":
            cookie.remove("cart")
            return [];
        default:
            return state;
    }
}

export default rootReducer