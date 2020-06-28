import {
    GET_USER_BY_ID,
} from '../actions';

const INIT_STATE = {
    userList: null,
    contacts: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USER_BY_ID:
            console.log('users reducer action', action)
            console.log('users reducer state', state)
            return {...state, loadingContacts: false};

        default:
            return {...state};
    }
}
