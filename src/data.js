const BASE_URL = "http://localhost:8000";
const new_item_path = "/api/expense/"

/** Adds new Expense entry to server
 * 
 * @param {*} expense data to post to Express server
 * @param {*} onSuccess callback function({...expense, _id: string})
 * @param {*} onFailure callback function(message: string)
 * @returns void
 */

export function addExpense(expense, onSuccess, onFailure) {
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