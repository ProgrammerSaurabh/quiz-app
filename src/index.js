import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Quiz from './pages/Quiz';
import { Toaster } from 'react-hot-toast';
import Create from './pages/Create';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster />
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={<App />}
        ></Route>
        <Route
          exact
          path='/quiz/create'
          element={<Create />}
        ></Route>
        <Route
          exact
          path='/quiz/:quiz-id'
          element={<Quiz />}
        ></Route>
        <Route
          path='*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
