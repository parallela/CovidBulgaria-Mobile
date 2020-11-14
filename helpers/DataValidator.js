/**
 * Check if the object is empty or not
 * @param {*} object 
 */
export const ObjectEmpty = (object = {}) => {
    if (object === undefined || object === null)
        return true;
    if (Object.keys(object).length < 1)
        return true;
    else return false;
}