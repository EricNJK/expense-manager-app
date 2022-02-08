import { ADD_EXPENSE, DELETE_EXPENSE, SET_LOAD_STATE } from "./types";
import { v4 as v4uuid } from "uuid";

// action creators
export const addExpense = ({ name, amount, spendDate, category }) => {
    return {
        type: ADD_EXPENSE,
        payload: {
            id: v4uuid(),
            name, amount, spendDate, category
        }
    }
}

export const deleteExpense = (id) => {
    return {
        type: DELETE_EXPENSE,
        payload: id
    }
}

export const setLoadState = (value) => {
    return {
        type: SET_LOAD_STATE,
        payload: value
    }
}

// reducer: updates state depending on action: {type, payload}
export default function expensesReducer(state = [], action) {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case DELETE_EXPENSE:
            return {
                ...state,
                items: state.items.filter(expense => (expense.id != action.payload))
            }
        case SET_LOAD_STATE:
            return {
                ...state,
                isLoaded: action.payload
            }
        default:
            return state;
    }
}
