import { BLOG_TAGS_ACTION } from "../actions/blogAction"
const initialState = {
    tags: [],
    loaded: true,
}
const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case BLOG_TAGS_ACTION:
            return {
                ...state,
                tags: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}
export default blogReducer;