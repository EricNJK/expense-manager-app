import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pager from './routes/Pager';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ExpenseForm from './routes/ExpenseForm';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import expensesReducer from './actions/index'

const pageCount = 4;  // items per page

// createStore(reducer, preloadedState)
const reduxStore = createStore(expensesReducer, { items: [], isLoaded: false });

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route index={true} element={
            <Provider store={reduxStore}>
              <Pager pageCount={pageCount} />
            </Provider>
          } />
          <Route path="/add" element={<ExpenseForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
