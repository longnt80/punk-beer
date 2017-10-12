export function menuClosed(state = true, action) {
    switch (action.type) {
        case 'TOGGLE_MENU_STATE':
            return action.menuClosed;

        default:
            return state;
    }
}