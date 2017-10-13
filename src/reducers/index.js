import { combineReducers } from 'redux';
import {    
    items, 
    itemsHasErrored, 
    itemsIsLoading, 
    itemsNeedPagination, 
    currentPagination,
    numberOfPage,
} from './items';

import { menuClosed } from './menu'

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    itemsNeedPagination,
    currentPagination,
    numberOfPage,
    menuClosed,
});