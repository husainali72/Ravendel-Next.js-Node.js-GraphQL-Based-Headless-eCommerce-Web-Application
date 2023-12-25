
export function addedCart(state = false, action) {

    switch (action.type) {
        case 'ADDED_CART':
            state = action.payload
            return action.payload
        default:
            return state;
    }
}