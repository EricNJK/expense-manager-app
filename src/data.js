const BASE_URL = "http://localhost:8000";
const new_item_path = "/api/expense/";
const all_items_path = "/api/expenses/";

/** Adds new Expense entry to server
 * 
 * @param {*} expense data to post to Express server
 * @param {*} onSuccess callback function({...expense, _id: string})
 * @param {*} onFailure callback function(message: string)
 * @returns void
 */

export function addRemoteExpense(expense, onSuccess, onFailure) {
    let requestInfo = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: expense })
    };

    fetch(BASE_URL + new_item_path, requestInfo)
        .then(response => {
            return response.json()
        }, rejectReason => {
            return onFailure(rejectReason)
        })
        .then(responseJson => {
            if (responseJson.expenses && responseJson.expenses[0]) {
                onSuccess(responseJson.expenses[0])
            } else if (responseJson.message) {
                onFailure(responseJson.message)
            }
        });
}

/**
 * Deletes expense entry matching id
 * 
 * @param expenseId 
 * @returns Promise 'chained' from network delete request
 */
export async function deleteRemoteExpense(expenseId) {
    const res = await fetch(BASE_URL + new_item_path + expenseId, { method: 'DELETE' });
    return await res.json();
}

/**
 * Gets list of all expenses from server
 * 
 * @returns Promise to supply Array of expenses
 */
export async function getExpenses() {
    const response = await fetch(BASE_URL + all_items_path);
    const data = await response.json();
    return data.expenses;
    // todo: .catch(...)
}