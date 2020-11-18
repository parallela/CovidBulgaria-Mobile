import { translateCity } from "../helpers/CityTranslator";

/**
 * Get the data from the API by location
 * @param {Object} location 
 */
export const getDataByLocation = location => {
    return dispatch => {
        dispatch({ type: 'FETCHING_DATA_BY_LOCATION' });
        return fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json").then(
            res => res.json()
        ).then(res => {
            const data = { ...res[translateCity(location.city)], city: translateCity(location.city), originalCityName: location.city };
            dispatch({ type: "GET_DATA_BY_LOCATION_SUCCESS", payload: data });
        });
    }
}


export const getSearchItems = () => {
    return dispatch => {
        dispatch({ type: 'FETCHING_SEARCH_ITEMS' });
        return fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json").then(
            res => res.json()
        ).then(res => {
            const items = [];
            Object.keys(res).forEach(val => {
                items.push({ name: val });
            });

            dispatch({ type: "FETCHING_SEARCH_ITEMS_SUCCESS", payload: items });
        });
    }
}