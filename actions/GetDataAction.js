import { translateCity } from "../helpers/CityTranslator";

/**
 * Get the data from the API by location
 * @param object location 
 */
export const getDataByLocation = location => {
    return dispatch => {
        dispatch({ type: 'FETCHING_DATA_BY_LOCATION' });
        return fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json").then(
            res => res.json()
        ).then(res => {
            const data = { ...res[translateCity(location.city)], city: translateCity(location.city) };
            dispatch({ type: "GET_DATA_BY_LOCATION_SUCCESS", payload: data });
        });
    }
}
/**
 * 
 * @param string city_name 
 */
export const getDataBySelectedCity = city_name => {
    // TODO;
}

export const getSearchItems = () => {
    return dispatch => {
        dispatch({ type: 'FETCHING_CITIES' });
        return fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json").then(
            res => res.json()
        ).then(res => {
            const items = [];
            Object.keys(res).forEach(val => {
                items.push({ name: val });
            });

            dispatch({ type: "FETCHING_CITIES_SUCCESS", payload: items });
        });
    }
}