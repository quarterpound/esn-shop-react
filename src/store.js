import Cookie from 'universal-cookie';
const cookie = new Cookie();

const initalState = cookie.get("cart") || [];

const rootReducer = (state = initalState, action) => {
    switch(action.type) {
        case "ADD":
            cookie.set("cart", [action.payload, ...state], {path: "/"});
            return [action.payload, ...state];
        case "REMOVE":
            cookie.set("cart", state.filter(t => {return t.id !== action.payload}), {path: "/"});
            return state.filter(t => {return t.id !== action.payload});
        case "CLEAR":
            cookie.remove("cart")
            return [];
        default:
            return state;
    }
}

export default rootReducer