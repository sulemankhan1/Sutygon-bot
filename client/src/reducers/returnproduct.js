import {
    GET_RETURNPRODUCT,
    RETURNPRODUCT_ERROR,
    RETURNPRODUCT_LOADING,
    
} from "../actions/types";
const initialState = {
    returnproduct: null,
    loading: false,
    saved: false,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RETURNPRODUCT_LOADING:
            return {
                ...state,
                loading: true,
            };

        case GET_RETURNPRODUCT:
            return {
                ...state,
                returnproduct: payload,
                loading: false,
                saved: false,
            };

        case RETURNPRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };

        default:
            return state;
    }
}
