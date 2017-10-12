import axios from 'axios';

const itemPerPage = 8;


export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}
export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsNeedPagination(bool) {
    return {
        type: 'ITEMS_NEED_PAGINATION',
        needPagination: bool
    }
}

export function currentPagination(num) {
    return {
        type: 'SET_CURRENT_PAGINATION',
        pageNumber: num
    }
}

export function numberOfPage(num) {
    return {
        type: 'COUNT_NUMBER_OF_PAGE',
        numberOfPage: num
    }
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        axios.get(url)
            .then((res) => {
                if (res.status <=200 && res.status > 300) {
                    throw Error(res.statusText);
                }

                dispatch(itemsIsLoading(false));
                
                return res;
            })
            .then((res) => res.data)
            .then((result) => {
                let items = [];
                for (let i = 0; i < result.length; i+=itemPerPage) {
                    items.push(result.slice(i, i+itemPerPage))
                }
                dispatch(currentPagination(1));
                
                if (result.length > itemPerPage) {
                    dispatch(itemsNeedPagination(true));
                }

                dispatch(itemsFetchDataSuccess(items));
                dispatch(numberOfPage(items.length));
            })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function menuClosed(bool) {
    return {
        type: 'TOGGLE_MENU_STATE',
        menuClosed: bool
    }
}