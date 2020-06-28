import {
    GET_USER_BY_ID

} from '../actions';



export const getUsers = (users_id) => {
    return ({
        type: GET_USER_BY_ID,
        payload: { users_id}
    })
};

