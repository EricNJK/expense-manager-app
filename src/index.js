import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ExpenseEntryListMui from './components/ExpenseEntryListMui';
import * as serviceWorker from './serviceWorker';
import Pager from './components/Pager';
import Clock from './components/Clock';

const items_src = [
  { id: 1, name: "Pizza", amount: 80, spendDate: "2020-10-10", category: "Food" },
  { id: 2, name: "Grape Juice", amount: 30, spendDate: "2020-10-12", category: "Food" },
  { id: 3, name: "Cinema", amount: 210, spendDate: "2020-10-16", category: "Entertainment" },
  { id: 4, name: "Java Programming book", amount: 242, spendDate: "2020-10-15", category: "Academic" },
  { id: 5, name: "Mango Juice", amount: 35, spendDate: "2020-10-16", category: "Food" },
  { id: 6, name: "Dress", amount: 2000, spendDate: "2020-10-25", category: "Cloth" },
  { id: 7, name: "Tour", amount: 2555, spendDate: "2020-10-29", category: "Entertainment" },
  { id: 8, name: "Meals", amount: 300, spendDate: "2020-10-30", category: "Food" },
  { id: 9, name: "Mobile", amount: 3500, spendDate: "2020-11-02", category: "Gadgets" },
  { id: 10, name: "Exam Fees", amount: 1245, spendDate: "2020-11-04", category: "Academic" }
]

const pageCount = 3;  // items per page

ReactDOM.render(
  <React.StrictMode>
    <Pager
      items={items_src}
      pageCount={pageCount}
      render={
        (pagerState) => (<div><ExpenseEntryListMui items={pagerState.items} onDelete={pagerState.deleteHandler} /></div>)
      }
    />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>, document.getElementById("clock-lifecycle"));


setTimeout(() => {
  ReactDOM.render(
    <StrictMode>
      <div><p>Clock removed from the DOM after 5 seconds</p></div>
    </StrictMode>,
    document.getElementById("clock-lifecycle"))
}, 5000);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function scratch() {
  console.log(items_src.reduce(getTotalByReduce, 0));

  function getTotalByReduce(accumulated, currentValue, currentIndex) {
    return accumulated += currentValue.amount;
  }
};
scratch();