export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const SET_SIDEBAR_COLLAPSED = 'SET_SIDEBAR_COLLAPSED';

export const toggleSidebar = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    }
}
export const setSidebarCollapsed = (state) => {
    return (dispatch) => {
        dispatch({
            type: SET_SIDEBAR_COLLAPSED,
            payload: state
        })
    }
}