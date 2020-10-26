import {
    GET_RETURNPRODUCT,
    RETURNPRODUCT_ERROR,
    RETURNPRODUCT_LOADING,
    GET_RETURNORDER
    
} from "../actions/types";
const initialState = {
    returnproduct: null,
    returnorder: null,
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
            case GET_RETURNORDER:
                return {
                    ...state,
                    returnorder: payload,
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