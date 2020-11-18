import { combineReducers } from "redux";
import GetInformationByLocation from "./GetInformationByLocation";
import GetCities from "./GetCities";
import GetSearchItems from "./GetSearchItems";


export default combineReducers({
    location: GetInformationByLocation,
    cities: GetCities,
    searchItems: GetSearchItems 
});