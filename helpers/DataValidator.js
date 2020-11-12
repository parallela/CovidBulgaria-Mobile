/**
 * Check if the object is empty or not
 * @param {Object} object 
 */
export const ObjectEmpty = object => {
    if (Object.keys(object).length < 1 || object === undefined || object === null)
        return true;
    else return false;
}