const INITIAL_STATE = {
    error: false,
    data: {},
    fetched: false,
    ready: true
};


const GetCities = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCHING_CITIES':
            return { ...state, ready: false, error: false };
        case 'FETCHING_CITIES_SUCCESS':
            return { ...state, data: action.payload, error: false, fetched: true, ready: true };
        case 'FETCHING_CITIES_FAILED':
            return { ...state, error: true, ready: true }
        default:
            return state;
    }
};

export default GetCities;