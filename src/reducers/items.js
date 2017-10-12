export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [[]], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}

export function itemsNeedPagination(state = false, action) {
    switch (action.type) {
        case 'ITEMS_NEED_PAGINATION':
            return action.needPagination;

        default:
            return state;
    }
}

export function currentPagination(state = 1, action) {
    switch (action.type) {
        case 'SET_CURRENT_PAGINATION':
            return action.pageNumber;

        default:
            return state;
    }
}

export function numberOfPage(state = 1, action) {
    switch (action.type) {
        case 'COUNT_NUMBER_OF_PAGE':
            return action.numberOfPage;

        default:
            return state;
    }
}