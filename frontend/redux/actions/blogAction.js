export const BLOG_TAGS_ACTION = "BLOG_TAGS_ACTION";

export const blogAction = (blogtags) => (dispatch) => {
    dispatch({
        type: BLOG_TAGS_ACTION,
        payload: blogtags
    })
}