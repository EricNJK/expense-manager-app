import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ExpenseEntryListMui from './components/ExpenseEntryListMui';
import Pager from './routes/Pager';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ExpenseForm from './routes/ExpenseForm';

const pageCount = 4;  // items per page

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route index={true} element={
            (
              <Pager pageCount={pageCount}
                renderList={(pagerState) => (
                  <div>
                    <ExpenseEntryListMui items={pagerState.items}
                      onDelete={pagerState.deleteHandler}
                      isLoaded={pagerState.isLoaded} />
                  </div>)
                }
              />)
          } />
          <Route path="/add" element={<ExpenseForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
  , document.getElementById('root')
);
