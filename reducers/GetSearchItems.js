const INITIAL_STATE = {
    error: false,
    data: {},
    fetched: false,
    ready: true
};


const GetSearchItems = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCHING_SEARCH_ITEMS':
            return { ...state, ready: false, error: false };
        case 'FETCHING_SEARCH_ITEMS_SUCCESS':
            return { ...state, data: action.payload, error: false, fetched: true, ready: true };
        case 'FETCHING_SEARCH_ITEMS_FAILED':
            return { ...state, error: true, ready: true }
        default:
            return state;
    }
};

export default GetSearchItems;