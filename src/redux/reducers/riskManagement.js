import { CHANGE_RISK } from "../actionTypes";

const initialState = {
    value: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_RISK: {
            const { content } = action.payload;
            return {
                ...state,
                value: content
            };
        }
        default:
            return state;
    }
}
