const INITIAL_STATE = {
    error: false,
    data: {},
    fetched: false,
    ready: true
};


const GetInformationByLocation = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCHING_DATA_BY_LOCATION':
            return { ...state, ready: false, error: false };
        case 'GET_DATA_BY_LOCATION_SUCCESS':
            return { ...state, data: action.payload, error: false, fetched: true, ready: true };
        case 'GET_DATA_BY_LOCATION_FAILED':
            return { ...state, error: true, ready: true }
        default:
            return state;
    }
};

export default GetInformationByLocation;