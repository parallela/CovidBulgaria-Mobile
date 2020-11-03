import { translateCity } from "../helpers/CityTranslator";

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